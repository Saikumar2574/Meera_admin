
import type { UniqueIdentifier } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { FlattenedItem, TreeItem, TreeItems } from "./types";

export const iOS = typeof window !== "undefined" && /iPad|iPhone|iPod/.test(navigator.platform);

function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}

export function getProjection(
  items: FlattenedItem[],
  activeId: UniqueIdentifier,
  overId: UniqueIdentifier,
  dragOffset: number,
  indentationWidth: number
) {
  const overItemIndex = items.findIndex(({ id }) => id === overId);
  const activeItemIndex = items.findIndex(({ id }) => id === activeId);
  const activeItem = items[activeItemIndex];
  const newItems = arrayMove(items, activeItemIndex, overItemIndex);
  const previousItem = newItems[overItemIndex - 1];
  const nextItem = newItems[overItemIndex + 1];
  const dragDepth = getDragDepth(dragOffset, indentationWidth);
  const projectedDepth = activeItem.depth + dragDepth;

  // Set max depth to 2
  const maxDepth = 1;
  const minDepth = getMinDepth({ nextItem });

  // Check if the active item has children
  const activeItemChildrenCount = getChildCount(items, activeId);

  // Adjust the depth, limiting it based on maxDepth and whether the item has children
  let depth = projectedDepth;

  if (projectedDepth > maxDepth) {
    depth = maxDepth;
  } else if (projectedDepth < minDepth) {
    depth = minDepth;
  }

  // Prevent moving an item with children to a depth that would violate the max depth rule
  debugger;
  if (
    activeItemChildrenCount > 0 &&
    depth + activeItemChildrenCount > maxDepth
  ) {
    depth = maxDepth - activeItemChildrenCount;
  }

  return { depth, maxDepth, minDepth, parentId: getParentId() };

  // Ensure parent assignment respects the depth limitation
  function getParentId() {
    // If depth is 0 or there is no previous item, item goes to the root
    if (depth === 0 || !previousItem) {
      return null;
    }

    // If the depth is the same as the previous item, use the same parent
    if (depth === previousItem.depth) {
      return previousItem.parentId;
    }

    // If the depth is greater than the previous item but doesn't exceed max depth
    if (depth > previousItem.depth) {
      return previousItem.id;
    }

    // Find a valid parent based on the depth
    const newParent = newItems
      .slice(0, overItemIndex)
      .reverse()
      .find((item) => item.depth === depth)?.parentId;

    return newParent ?? null;
  }
}

// Helper function to find the maximum depth of the subtree
function getMaxSubtreeDepth(
  itemId: UniqueIdentifier,
  items: FlattenedItem[]
): number {
  const itemIndex = items.findIndex((item) => item.id === itemId);
  const itemDepth = items[itemIndex].depth;

  let maxSubtreeDepth = 0;

  // Iterate through subsequent items to find the deepest child
  for (let i = itemIndex + 1; i < items.length; i++) {
    if (items[i].depth <= itemDepth) {
      break; // Stop when we exit the subtree
    }
    const currentSubtreeDepth = items[i].depth - itemDepth;
    if (currentSubtreeDepth > maxSubtreeDepth) {
      maxSubtreeDepth = currentSubtreeDepth;
    }
  }

  return maxSubtreeDepth;
}

function getMaxDepth({ previousItem }: { previousItem: FlattenedItem }) {
  if (previousItem) {
    return previousItem.depth + 1;
  }

  return 0;
}

function getMinDepth({ nextItem }: { nextItem: FlattenedItem }) {
  if (nextItem) {
    return nextItem.depth;
  }

  return 0;
}

function flatten(
  items: TreeItems,
  parentId: UniqueIdentifier | null = null,
  depth = 0
): FlattenedItem[] {
  return items.reduce<FlattenedItem[]>((acc, item, index) => {
    return [
      ...acc,
      { ...item, parentId, depth, index },
      ...flatten(item.children, item.id, depth + 1),
    ];
  }, []);
}

export function flattenTree(items: TreeItems): FlattenedItem[] {
  return flatten(items);
}

export function buildTree(flattenedItems: FlattenedItem[]): TreeItems {
  const root: TreeItem = { id: "root", children: [], name: "root" };
  const nodes: Record<string, TreeItem> = { [root.id]: root };
  const items = flattenedItems.map((item) => ({ ...item, children: [] }));

  for (const item of items) {
    const { id, children, name } = item;
    const parentId = item.parentId ?? root.id;
    const parent = nodes[parentId] ?? findItem(items, parentId);

    nodes[id] = { id, children, name };
    parent.children.push(item);
  }

  return root.children;
}

export function findItem(items: TreeItem[], itemId: UniqueIdentifier) {
  return items.find(({ id }) => id === itemId);
}

export function findItemDeep(
  items: TreeItems,
  itemId: UniqueIdentifier
): TreeItem | undefined {
  for (const item of items) {
    const { id, children } = item;

    if (id === itemId) {
      return item;
    }

    if (children.length) {
      const child = findItemDeep(children, itemId);

      if (child) {
        return child;
      }
    }
  }

  return undefined;
}

export function removeItem(items: TreeItems, id: UniqueIdentifier) {
  const newItems = [];

  for (const item of items) {
    if (item.id === id) {
      continue;
    }

    if (item.children.length) {
      item.children = removeItem(item.children, id);
    }

    newItems.push(item);
  }

  return newItems;
}

export function setProperty<T extends keyof TreeItem>(
  items: TreeItems,
  id: UniqueIdentifier,
  property: T,
  setter: (value: TreeItem[T]) => TreeItem[T]
) {
  for (const item of items) {
    if (item.id === id) {
      item[property] = setter(item[property]);
      continue;
    }

    if (item.children.length) {
      item.children = setProperty(item.children, id, property, setter);
    }
  }

  return [...items];
}

function countChildren(items: TreeItem[], count = 0): number {
  if (items.length === 0) {
    return 0;
  }

  // Start by counting 1 if the item has children
  let levelCount = 1;

  // Check if any child has its own children (grandchildren)
  const hasGrandchildren = items.some(({ children }) => children.length > 0);

  // If any child has grandchildren, increment the count by 1
  if (hasGrandchildren) {
    levelCount += 1;
  }

  return levelCount;
}

export function getChildCount(items: TreeItems, id: UniqueIdentifier | null) {
  const item = findItemDeep(items, id!);

  return item ? countChildren(item.children) : 0;
}

export function getChildrens(items: TreeItems, id: UniqueIdentifier) {
  const item = findItemDeep(items, id);

  return item ? item.children : [];
}

export function removeChildrenOf(
  items: FlattenedItem[],
  ids: UniqueIdentifier[]
) {
  const excludeParentIds = [...ids];

  return items.filter((item) => {
    if (item.parentId && excludeParentIds.includes(item.parentId)) {
      if (item.children.length) {
        excludeParentIds.push(item.id);
      }
      return false;
    }

    return true;
  });
}
