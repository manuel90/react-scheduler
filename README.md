# React Scheduler Component

Customizable calendar and scheduling component for React applications, forked from `@aldabil/react-scheduler` with additional features and improvements.

### Notes
This fork was created to address specific requirements for a project. *Not all functionalities have been tested yet*. <br>
For documentation, features, and additional usage examples, visit the [original npm package page](https://www.npmjs.com/package/@aldabil/react-scheduler).

## Installation

> :warning: **Notice**: This component uses `mui`/`emotion`/`date-fns`. if your project is not already using these libs, this component may not be suitable.

```jsx
npm i @manuel90/react-scheduler
```

If you plan to use `recurring` events in your scheduler, install `rrule` [package](https://www.npmjs.com/package/rrule)

## Usage

```jsx
import { Scheduler } from "@manuel90/react-scheduler";
```

## Example

```jsx
<Scheduler
  view="month"
  events={[
    {
      event_id: 1,
      title: "Event 1",
      start: new Date("2021/5/2 09:30"),
      end: new Date("2021/5/2 10:30"),
    },
    {
      event_id: 2,
      title: "Event 2",
      start: new Date("2021/5/4 10:00"),
      end: new Date("2021/5/4 11:00"),
    },
  ]}
/>
```

### Scheduler Props

All props are *optional*.

| Prop                | Value                                                                |  Default    |
|---------------------|----------------------------------------------------------------------|-------------|
| navigationSlot      | Slot in the navigation section.                                      | `undefined` |

### Original Props

Here are the original props supported by the library. <br>
[Click here to see the full list](https://www.npmjs.com/package/@aldabil/react-scheduler)

---

### SchedulerRef

Used to help manage and control the internal state of the `Scheduler` component from outside of `Scheduler` props, Example:

```js
import { Scheduler } from "@manuel90/react-scheduler";
import type { SchedulerRef } from "@manuel90/react-scheduler/types"

const SomeComponent = () => {
  const calendarRef = useRef<SchedulerRef>(null);

  return <Fragment>
    <div>
      <Button onClick={()=>{
        calendarRef.current.scheduler.handleState("day", "view");
      }}>
        Change View
      </Button>
      <Button onClick={()=>{
        calendarRef.current.scheduler.triggerDialog(true, {
          start: /*Put the start date*/,
          end: /*Put the end date*/
        })
      }}>
        Add Event Tomorrow
      </Button>
    </div>

    <Scheduler
      ref={calendarRef}
      events={EVENTS}
      //...
    />
  </Fragment>
};
```

The `calendarRef` holds the entire internal state of the Scheduler component. Perhaps the most useful method inside the `calendarRef` is `handleState`, example:

```
calendarRef.current.scheduler.handleState(value, key);
```

consider looking inside `SchedulerRef` type to see all fields & methods available.

### Demos

- [Basic](https://codesandbox.io/p/sandbox/standard-x24pqk)
- [Remote Data](https://codesandbox.io/s/remote-data-j13ei)
- [Custom Fields](https://codesandbox.io/s/custom-fields-b2kbv)
- [Editor/Viewer Override](https://codesandbox.io/s/customeditor-tt2pf)
- [Resources/View Mode](https://codesandbox.io/s/resources-7wlcy)
- [Custom Cell Action](https://codesandbox.io/s/custom-cell-action-n02dv)
- [Custom Event Renderer](https://codesandbox.io/s/custom-event-renderer-rkf4xw)

### Todos

- [ ] Tests
- [x] Drag&Drop - partially
- [ ] Resizable
- [x] Recurring events - partially
- [x] Localization
- [x] Hour format 12 | 24
