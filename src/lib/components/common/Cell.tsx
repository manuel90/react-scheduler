"use client";

import { Button } from "@mui/material";
import useCellAttributes from "../../hooks/useCellAttributes";
import { CellRenderedProps } from "../../types";
import useIsClient from "../../hooks/useIsClient";

interface CellProps {
  day: Date;
  start: Date;
  height: number;
  end: Date;
  resourceKey: string;
  resourceVal: string | number;
  cellRenderer?(props: CellRenderedProps): React.ReactNode;
  children?: React.ReactNode;
  timeZone?: string;
}

const Cell = ({
  day,
  start,
  end,
  resourceKey,
  resourceVal,
  cellRenderer,
  height,
  children,
  timeZone,
}: CellProps) => {
  const props = useCellAttributes({ start, end, resourceKey, resourceVal });
  const isClient = useIsClient();

  if (cellRenderer) {
    return cellRenderer({
      day,
      start,
      end,
      height,
      ...props,
    });
  }

  return (
    <>
      {isClient && (
        <Button
          fullWidth
          aria-label={`${start.toLocaleString("en", {
            dateStyle: "full",
            timeStyle: "long",
            timeZone,
          })} - ${end.toLocaleString("en", { dateStyle: "full", timeStyle: "long", timeZone })}`}
          {...props}
        >
          {children}
        </Button>
      )}
    </>
  );
};

export default Cell;
