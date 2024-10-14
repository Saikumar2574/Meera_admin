import React, {
  Dispatch,
  SetStateAction,
  useState,
  DragEvent,
  FormEvent,
} from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { Card, CardContent } from "./card";
import { Button } from "./button";
import Image from "next/image";
import { ArrowRightCircle, ChevronRight, EllipsisVertical, MoveRight } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Badge } from "../ui/badge";
export const CustomKanban = () => {
  return (
    <div className="w-full">
      {/* <Card className="px-4 py-8">
        <CardContent> */}
      <Board />
      {/* </CardContent>
      </Card> */}
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);

  return (
    <div className="flex flex-grow h-full w-full gap-6">
      <Column
        title="Helmet - Types"
        column="backlog"
        headingColor="text-black"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Helmet - Accessories"
        column="todo"
        headingColor="text-black"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Helmet - Maintainence"
        column="doing"
        headingColor="text-black"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Helmet - Pre Owned"
        column="done"
        headingColor="text-black"
        cards={cards}
        setCards={setCards}
      />
      {/* <BurnBarrel setCards={setCards} /> */}
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const Column = ({
  title,
  headingColor,
  cards,
  column,
  setCards,
}: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || "-1";

    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((c) => c.id === cardId);
      if (!cardToTransfer) return;
      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;

        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);

    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();

    indicators.forEach((i) => {
      i.style.opacity = "0";
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();

    clearHighlights(indicators);

    const el = getNearestIndicator(e, indicators);

    el.element.style.opacity = "1";
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();

        const offset = e.clientY - (box.top + DISTANCE_OFFSET);

        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return el;
  };

  const getIndicators = () => {
    return Array.from(
      document.querySelectorAll(
        `[data-column="${column}"]`
      ) as unknown as HTMLElement[]
    );
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="flex-1">
      <div className="mb-3 flex items-center justify-between px-2">
        <h3 className={`font-semibold`}>{title}</h3>
        <div>
          <span className=" h-min text-sm text-white dark:text-black mr-4 px-2 py-1 rounded-full bg-black dark:bg-white">
            {filteredCards.length}
          </span>
        </div>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors px-2 rounded-lg ${
          active ? "bg-gray-100 dark:bg-[#87878750]" : "bg-neutral-800/0"
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <CardDetails key={c.id} {...c} handleDragStart={handleDragStart} />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        {/* <AddCard column={column} setCards={setCards} /> */}
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: Function;
};

const CardDetails = ({ title, id, column, handleDragStart }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        title={title}
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="cursor-grab rounded-lg border flex justify-between p-2 my-1.5 items-center   bg-[#fff] dark:bg-black group  active:cursor-grabbing"
      >
        <div className="flex items-center gap-1">
          <EllipsisVertical />
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="40"
            src="/camera.jpg"
            width="40"
          />

          <p className="text-sm ml-2 max-w-28 capitalize truncate overflow-hidden whitespace-nowrap text-ellipsis">
            {title}
          </p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <ChevronRight className="cursor-pointer" size={20} />
          </SheetTrigger>
          <SheetContent side="right" className="sm:max-w-lg">
            <nav className="grid gap-6 text-lg font-medium">
              <h2 className="text-lg font-bold">{title}</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                      <TableHead>Image</TableHead>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Price
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src="/camera.jpg"
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      Laser Lemonade Machine
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Draft</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      $499.99
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src="/camera.jpg"
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      Hypernova Headphones
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      $129.99
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src="/camera.jpg"
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      AeroGlow Desk Lamp
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      $39.99
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src="/camera.jpg"
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      TechTonic Energy Drink
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">Draft</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      $2.99
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src="/camera.jpg"
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      Gamer Gear Pro Controller
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      $59.99
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="hidden sm:table-cell">
                      <Image
                        alt="Product image"
                        className="aspect-square rounded-md object-cover"
                        height="64"
                        src="/camera.jpg"
                        width="64"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      Luminous VR Headset
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Active</Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      $199.99
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </nav>
          </SheetContent>
        </Sheet>

        {/* <Button className="w-full hidden group-hover:block">View Products</Button> */}
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || "-1"}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-green-600 opacity-0"
    />
  );
};

const BurnBarrel = ({
  setCards,
}: {
  setCards: Dispatch<SetStateAction<CardType[]>>;
}) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = (e: DragEvent) => {
    const cardId = e.dataTransfer.getData("cardId");

    setCards((pv) => pv.filter((c) => c.id !== cardId));

    setActive(false);
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? "border-red-800 bg-red-800/20 text-red-500"
          : "border-neutral-500 bg-neutral-500/20 text-neutral-500"
      }`}
    >
      {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
    </div>
  );
};

type AddCardProps = {
  column: ColumnType;
  setCards: Dispatch<SetStateAction<CardType[]>>;
};

const AddCard = ({ column, setCards }: AddCardProps) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard = {
      column,
      title: text.trim(),
      id: Math.random().toString(),
    };

    setCards((pv) => [...pv, newCard]);

    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit}>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-50 placeholder-violet-300 focus:outline-0"
          />
          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
            >
              <span>Add</span>
              <FiPlus />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
        >
          <span>Add card</span>
          <FiPlus />
        </motion.button>
      )}
    </>
  );
};

type ColumnType = "backlog" | "todo" | "doing" | "done";

type CardType = {
  title: string;
  id: string;
  column: ColumnType;
};

const DEFAULT_CARDS: CardType[] = [
  // BACKLOG
  { title: "Full Face", id: "1", column: "backlog" },
  { title: "Open Face", id: "2", column: "backlog" },
  { title: "off-road", id: "4", column: "backlog" },
  // TODO
  { title: "Helmet Visors", id: "3", column: "backlog" },
  {
    title: "Helmet Pads ",
    id: "5",
    column: "todo",
  },
  { title: "helmet Bags", id: "6", column: "todo" },
  { title: "Sync with product product", id: "7", column: "todo" },
  {
    title: "helmet locks",
    id: "8",
    column: "doing",
  },

  // DOING

  { title: "Maintainence ", id: "9", column: "doing" },
  // DONE
  {
    title: "Pre Owned",
    id: "10",
    column: "done",
  },
];
