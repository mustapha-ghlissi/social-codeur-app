import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import BasicTableOne from "@/components/tables/BasicTableOne";
import { PlusIcon } from "@/icons";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Mes annonces",
  description:
    "Mes annonces",
};

export default function Posts() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Mes annonces" />
      <div className="space-y-6">
        <ComponentCard title="Liste des annonces">
          <div className="text-right">
            <Link href={"/posts/new"} className="inline-flex h-11.5 px-5.5 items-center justify-center font-medium gap-2 rounded-lg transition bg-brand-500 text-white shadow-theme-xs hover:bg-brand-600 disabled:bg-brand-300">
              <PlusIcon />
                Créer une annonce
            </Link>
            </div>
          <BasicTableOne />
        </ComponentCard>
      </div>
    </div>
  );
}
