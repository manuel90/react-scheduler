import { forwardRef } from "react";
import SchedulerComponent from "./SchedulerComponent";
import { IScheduler, SchedulerRef } from "./types";
import { StoreProvider } from "./store/provider";

const Scheduler = forwardRef<SchedulerRef, IScheduler>(function Scheduler(props, ref) {
  return (
    <StoreProvider initial={props}>
      <SchedulerComponent ref={ref} />
    </StoreProvider>
  );
});

export { Scheduler };
