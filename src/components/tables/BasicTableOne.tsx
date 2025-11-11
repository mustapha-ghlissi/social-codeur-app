"use client"

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import Badge from "../ui/badge/Badge";
import Image from "next/image";
import Pagination from "./Pagination";

interface Post {
  id: number;
  title: string;
  content: string;
  published: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Define the table data using the interface
const tableData: Post[] = [
  {
    id: 1,
    title: "Annonce demo",
    content: "Annonce demo",
    published: true,
  },
  {
    id: 2,
    title: "Annonce demo 2",
    content: "Annonce demo 2",
    published: false,
  },
  {
    id: 3,
    title: "Annonce demo 3",
    content: "Annonce demo 3",
    published: true,
  },
  {
    id: 4,
    title: "Annonce demo 4",
    content: "Annonce demo 4",
    published: true,
  },
  {
    id: 5,
    title: "Annonce demo 5",
    content: "Annonce demo 5",
    published: true,
  },
  {
    id: 6,
    title: "Annonce demo 6",
    content: "Annonce demo 6",
    published: true,
  },
  {
    id: 7,
    title: "Annonce demo 7",
    content: "Annonce demo 7",
    published: true,
  },
];

export default function BasicTableOne() {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  ID
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                 Titre
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Contenu
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Publié ?
                </TableCell>
                
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {tableData.map((post: Post) => (
                <TableRow key={post.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    {post.id}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {post.title}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {post.content}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        post.published
                          ? "success"
                          : "warning"
                      }
                    >
                      {post.published ? 'Oui' : 'Non'}
                    </Badge>
                  </TableCell>
                  {/*<TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {order.budget}
                  </TableCell>*/}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
