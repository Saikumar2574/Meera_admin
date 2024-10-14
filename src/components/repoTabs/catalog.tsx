"use client";
import { MenuBuilder } from "@/components/Builder/MenuBuilder";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RefreshCcw } from "lucide-react";
import { Folder, Tree } from "../ui/file-tree";

function CatalogStructure() {
  const [menus, setMenus] = useState([
    {
      id: "1",
      name: "Action Camera",
      children: [
        {
          id: "1.1",
          name: "Action Camera",
          children: [],
        },
        {
          id: "1.2",
          name: "Bluetooth Intercom",
          children: [],
        },
        {
          id: "1.3",
          name: "Gear Shift Sock",
          children: [],
        },
        {
          id: "1.4",
          name: "Mesh Intercom",
          children: [],
        },
        {
          id: "1.5",
          name: "Mobile Holder",
          children: [],
        },
        {
          id: "1.6",
          name: "Seat Cushion",
          children: [],
        },
      ],
    },
    {
      id: "2",
      name: "Luggage",
      children: [
        {
          id: "2.1",
          name: "Luggage",
          children: [],
        },
        {
          id: "2.2",
          name: "Modification",
          children: [],
        },
      ],
    },
    {
      id: "3",
      name: "For Gear",
      children: [
        {
          id: "3.1",
          name: "For Gear",
          children: [],
        },
        {
          id: "3.2",
          name: "for Motorcycles",
          children: [],
        },
      ],
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    href: "",
    children: [],
  });

  const [treeData, setTreeData] = useState<any[]>([
    {
      id: "1",
      name: "Action Camera",
      isSelectable: true,
      children: [
        {
          id: "1.1",
          name: "Action Camera",
          children: [],
        },
        {
          id: "1.2",
          name: "Bluetooth Intercom",
          children: [],
        },
        {
          id: "1.3",
          name: "Gear Shift Sock",
          children: [],
        },
        {
          id: "1.4",
          name: "Mesh Intercom",
          children: [],
        },
        {
          id: "1.5",
          name: "Mobile Holder",
          children: [],
        },
        {
          id: "1.6",
          name: "Seat Cushion",
          children: [],
        },
      ],
    },
    {
      id: "2",
      name: "Luggage",
      isSelectable: true,
      children: [
        {
          id: "2.1",
          name: "Luggage",
          children: [],
        },
        {
          id: "2.2",
          name: "Modification",
          children: [],
        },
      ],
    },
    {
      id: "3",
      name: "For Gear",
      isSelectable: true,
      children: [
        {
          id: "3.1",
          name: "For Gear",
          children: [],
        },
        {
          id: "3.2",
          name: "for Motorcycles",
          children: [],
        },
      ],
    },
  ]);

  const renderTree = (nodes: any[]) => (
    <ul className="pl-4">
      {nodes?.map((node) => (
        <li key={node.id} className="mb-2">
          <div
            // onClick={() => toggleExpand(node.id)}
            className="flex items-center cursor-pointer"
          >
            {node.children && <span className="mr-2">-</span>}
            <span>{node.name}</span>
          </div>
          {renderTree(node.children)}
        </li>
      ))}
    </ul>
  );

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    setMenus([
      ...menus,
      {
        ...formData,
        id: Math.random().toString(36).substring(7),
      },
    ]);
    setFormData({ id: "", name: "", href: "", children: [] });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const renderFolders = (nodes: any) => {
    return nodes.map((node: any) => (
      <Folder key={node.id} element={node.name} value={node.id}>
        {node.children.length > 0 && renderFolders(node.children)}
      </Folder>
    ));
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="flex w-full gap-12 mt-6 ">
          {/* Left side: Tree view */}
          <div className="w-1/2 overflow-auto max-h-[73vh] border rounded-lg overflow-y-auto">
            <h2 className="text-lg font-semibold p-3 bg-black text-center dark:bg-white text-white dark:text-black  mb-4">
              Store Structure
            </h2>
            {/* {renderTree(treeData)} */}

            <div className="relative flex flex-col  p-4  items-center justify-center overflow-hidden">
              <Tree
                className="p-2 overflow-hidden"
                initialSelectedId="1"
                initialExpandedItems={["1"]}
                elements={treeData}
              >
                {renderFolders(treeData)}
              </Tree>
            </div>
          </div>

          {/* Right side: MenuBuilder */}
          <div className="w-1/2 overflow-auto max-h-[73vh] overflow-y-auto border rounded-lg">
            {/* <button
                onClick={() => {
                  showModal();
                }}
                className="ml-auto px-4 py-1 border border-black rounded-lg mb-2"
              >
                Add Menu
              </button> */}
            <h2 className="text-lg font-semibold p-3 bg-black text-center dark:bg-white text-white dark:text-black  mb-4">
              Meera Structure
            </h2>
            <MenuBuilder items={menus} setItems={setMenus}  />
          </div>
        </div>

        <Modal
          title="Add Menu"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Add"
        >
          <label
            style={{
              fontSize: "12px",
              color: "#1d1d1d7f",
            }}
            htmlFor=""
          >
            Menu Name
          </label>
          <Input
            placeholder="Home"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Modal>
      </div>
    </>
  );
}

export default CatalogStructure;

const initialMenus = [
  {
    id: "Home",
    name: "Home",
    children: [],
  },
  {
    id: "Collections",
    name: "Collections",
    children: [
      {
        id: "Spring",
        name: "Spring",
        children: [{ id: "Luggage", name: "Luggage", children: [] }],
      },
    ],
  },
];
