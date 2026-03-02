import { Fragment, useState } from "react";
import {
  Button,
  useTheme,
  useMediaQuery,
  Popover,
  MenuList,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import { WeekDateBtn } from "./WeekDateBtn";
import { DayDateBtn } from "./DayDateBtn";
import { MonthDateBtn } from "./MonthDateBtn";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ViewAgendaIcon from "@mui/icons-material/ViewAgenda";
import useStore from "../../hooks/useStore";
import { NavigationDiv } from "../../styles/styles";
import { getTimeZonedDate } from "../../helpers/generals";

export type View = "month" | "week" | "day";

const Navigation = ({ children }: { children?: React.ReactNode }) => {
  const {
    selectedDate,
    view,
    week,
    handleState,
    getViews,
    translations,
    navigation,
    day,
    month,
    disableViewNavigator,
    onSelectedDateChange,
    onViewChange,
    stickyNavigation,
    timeZone,
    agenda,
    toggleAgenda,
    enableAgenda,
  } = useStore();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const views = getViews();

  const toggleMoreMenu = (el?: Element) => {
    setAnchorEl(el || null);
  };

  const handleSelectedDateChange = (date: Date) => {
    handleState(date, "selectedDate");

    if (onSelectedDateChange && typeof onSelectedDateChange === "function") {
      onSelectedDateChange(date);
    }
  };

  const handleChangeView = (view: View) => {
    handleState(view, "view");
    if (onViewChange && typeof onViewChange === "function") {
      onViewChange(view, agenda);
    }
  };

  const renderDateSelector = () => {
    switch (view) {
      case "month":
        return (
          month?.navigation && (
            <div className="rs__date_navigator_inner">
              <MonthDateBtn selectedDate={selectedDate} onChange={handleSelectedDateChange} />
            </div>
          )
        );
      case "week":
        return (
          week?.navigation && (
            <div className="rs__date_navigator_inner">
              <WeekDateBtn
                selectedDate={selectedDate}
                onChange={handleSelectedDateChange}
                weekProps={week!}
              />
            </div>
          )
        );
      case "day":
        return (
          day?.navigation && (
            <div className="rs__date_navigator_inner">
              <DayDateBtn selectedDate={selectedDate} onChange={handleSelectedDateChange} />
            </div>
          )
        );
      default:
        return "";
    }
  };

  if (!navigation && disableViewNavigator) return null;

  return (
    <NavigationDiv className="rs__navigation" sticky={stickyNavigation ? "1" : "0"}>
      <div className="rs__date_navigator" data-testid="date-navigator">
        {navigation && renderDateSelector()}
      </div>
      {children}
      <div
        className="rs__view_navigator"
        data-testid="view-navigator"
        style={{
          visibility: disableViewNavigator ? "hidden" : "visible",
        }}
      >
        <Button
          className="rs__navigation_button rs__navigation_today_button"
          onClick={() => handleSelectedDateChange(getTimeZonedDate(new Date(), timeZone))}
          aria-label={translations.navigation.today}
        >
          {translations.navigation.today}
        </Button>
        {enableAgenda &&
          (isDesktop ? (
            <Button
              className={`rs__navigation_button rs__navigation_agenda_button ${agenda ? "rs__active" : ""}`}
              color={agenda ? "primary" : "inherit"}
              onClick={toggleAgenda}
              aria-label={translations.navigation.agenda}
            >
              {translations.navigation.agenda}
            </Button>
          ) : (
            <IconButton
              className={`rs__navigation_button rs__navigation_agenda_button ${agenda ? "rs__active" : ""}`}
              color={agenda ? "primary" : "default"}
              style={{ padding: 5 }}
              onClick={toggleAgenda}
            >
              <ViewAgendaIcon />
            </IconButton>
          ))}

        {views.length > 1 &&
          (isDesktop ? (
            <Box
              className="rs__navigation_view_buttons"
              sx={{
                display: "flex",
                gap: "10px",
              }}
            >
              {views.map((v) => (
                <Button
                  key={v}
                  color={v === view ? "primary" : "inherit"}
                  className={`rs__navigation_button ${v === view ? "rs__active" : ""}`}
                  onClick={() => handleChangeView(v)}
                  onDragOver={(e) => {
                    e.preventDefault();
                    handleChangeView(v);
                  }}
                >
                  {translations.navigation[v]}
                </Button>
              ))}
            </Box>
          ) : (
            <Fragment>
              <IconButton
                style={{ padding: 5 }}
                onClick={(e) => {
                  toggleMoreMenu(e.currentTarget);
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={() => {
                  toggleMoreMenu();
                }}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuList autoFocusItem={!!anchorEl} disablePadding>
                  {views.map((v) => (
                    <MenuItem
                      key={v}
                      selected={v === view}
                      onClick={() => {
                        toggleMoreMenu();
                        handleChangeView(v);
                      }}
                    >
                      {translations.navigation[v]}
                    </MenuItem>
                  ))}
                </MenuList>
              </Popover>
            </Fragment>
          ))}
      </div>
    </NavigationDiv>
  );
};

export { Navigation };
