"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { formUrlQuery, removeKeysFromUrlQuery } from "@/lib/url";

const filters = [
  {
    name: "React",
    value: "react",
  },
  {
    name: "JavaScript",
    value: "javascript",
  },
  // {
  //   name: "All",
  //   value: "all",
  // },
  // {
  //   name: "Popular",
  //   value: "popular",
  // },
  // {
  //   name: "Unanswered",
  //   value: "unanswered",
  // },
  // {
  //   name: "Recommended",
  //   value: "recommended",
  // },
];

const HomeFilters = () => {
  const router = useRouter();
  const serachParams = useSearchParams();
  const filterParams = serachParams.get("filter");

  const [active, setActive] = useState(filterParams || "");

  const handleTypeClick = (filter: string) => {
    let newUrl = "";

    if (filter === active) {
      setActive("");
      newUrl = removeKeysFromUrlQuery({
        params: serachParams.toString(),
        keysToRemove: ["filter"],
      });
    } else {
      setActive(filter);

      newUrl = formUrlQuery({
        params: serachParams.toString(),
        key: "filter",
        value: filter,
      });
    }
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="mt-10 hidden flex-wrap gap-3 sm:flex">
      {filters.map((filter) => (
        <Button
          onClick={() => handleTypeClick(filter.value)}
          key={filter.value}
          className={cn(
            `body-medium rounded-lg px-6 py-3 capitalize shadow-none`,
            active === filter.value
              ? "bg-primary-100 text-primary-500 hover:bg-primary-100 dark:bg-dark-400 dark:text-primary-500 dark:hover:bg-primary-400"
              : "bg-light-800 text-light-500 hover:bg-light-800 dark:bg-dark-300 dark:text-light-500 dark:hover:bg-dark-300"
          )}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
