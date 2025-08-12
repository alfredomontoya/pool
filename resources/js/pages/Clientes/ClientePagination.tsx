import { router } from "@inertiajs/react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface PaginationProps {
  links: { url: string | null; label: string; active: boolean }[];
}

export default function Pagination({ links }: PaginationProps) {
  return (
    <div className="mt-4 flex gap-2">
      {links.map((link, i) => {
        const label = link.label.includes("Previous") ? (
          <ChevronLeftIcon className="w-4 h-4" />
        ) : link.label.includes("Next") ? (
          <ChevronRightIcon className="w-4 h-4" />
        ) : (
          link.label
        );

        return (
          <button
            key={i}
            disabled={!link.url}
            onClick={() => link.url && router.get(link.url)}
            className={`px-3 py-1 border rounded flex items-center justify-center ${
              link.active ? "bg-gray-300" : ""
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
