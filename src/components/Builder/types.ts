import type { MutableRefObject } from 'react';
import type { UniqueIdentifier } from '@dnd-kit/core';

export interface TreeItem {
  depth?: number;
  id: UniqueIdentifier;
  href?: string;
  children: TreeItem[];
  collapsed?: boolean;
  name: string;
}

export type TreeItems = TreeItem[];

export interface FlattenedItem extends TreeItem {
  parentId: UniqueIdentifier | null;
  depth: number;
  index: number;
}

export type SensorContext = MutableRefObject<{
  items: FlattenedItem[];
  offset: number;
}>;