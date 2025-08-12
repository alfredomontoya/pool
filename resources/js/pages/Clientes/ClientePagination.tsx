import React from "react";
import { router } from "@inertiajs/react";

interface LinkItem {
  url: string | null;
  label: string;
  active: boolean;
}

interface Props {
  links: LinkItem[];
}

export default function ClientesPagination({ links }: Props) {
  return (
    <div className="mt-4 flex gap-2">
      {links.map((link, i) => (
        <button
          key={i}
          disabled={!link.url}
          onClick={() => link.url && router.get(link.url)}
          className={`px-3 py-1 border rounded ${
            link.active ? "bg-gray-300" : ""
          }`}
        >
          {link.label}
        </button>
      ))}
    </div>
  );
}
