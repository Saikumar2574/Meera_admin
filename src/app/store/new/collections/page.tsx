"use client";
import { MenuBuilder } from "@/components/Builder/MenuBuilder";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import axios from "axios";

function App() {
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

  // const getCategories = async () => {
  //   await axios
  //     .get("https://nlp.codetrappers.in/wp-json/wc/v3/categories/tree")
  //     .then((res) => {
  //       setTreeData(res.data);
  //     });
  // };

  // useEffect(() => {
  //   getCategories();
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="flex w-full ">
        {/* Left side: Tree view */}
        <div className="w-1/2 bg-gray-100 p-4 overflow-auto max-h-[73vh] overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Tree View</h2>
          {renderTree(treeData)}
        </div>

        {/* Right side: MenuBuilder */}
        <div className="w-1/2 bg-gray-100 p-4 overflow-auto max-h-[73vh] overflow-y-auto">
          <button
            onClick={() => {
              showModal();
            }}
            className="ml-auto px-4 py-1 border border-black rounded-lg mb-2"
          >
            Add Menu
          </button>

          <MenuBuilder items={menus} setItems={setMenus} />
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
  );
}

export default App;

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
