import { Fragment, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ListGroup, Accordion, Card, Image, Badge, useAccordionButton, AccordionContext } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import { DashboardMenu } from "../../../api/routes/DashboardRoutes";
import { useMediaQuery } from "react-responsive";

const NavbarVertical = (props) => {
  // const location = useRouter();
  const CustomToggle = ({ children, eventKey, icon }) => {
    const { activeEventKey } = useContext(AccordionContext);
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );
    const isCurrentEventKey = activeEventKey === eventKey;
    return (
      <li className="nav-item">
        <Link
          href="#"
          className="nav-link "
          onClick={decoratedOnClick}
          data-bs-toggle="collapse"
          data-bs-target="#navDashboard"
          aria-expanded={isCurrentEventKey ? true : false}
          aria-controls="navDashboard"
        >
          {icon ? <i className={`nav-icon fe fe-${icon} me-2`}></i> : ""}{" "}
          {children}
        </Link>
      </li>
    );
  };
  const generateLink = (item) => {
    return (
      <Link
        href={item.link}
        className={`nav-link ${location.pathname === item.link ? "active" : ""}`}
        onClick={(e) => isMobile ? props.onClick(!props.showMenu) : props.showMenu}
      >
        {item.name}
        {""}
        {item.badge ? (
          <Badge className="ms-1" bg={item.badgecolor ? item.badgecolor : "primary"}>
            {item.badge}
          </Badge>
        ) : ("")}
      </Link>
    );
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Fragment>
      <SimpleBar style={{ maxHeight: "100vh" }}>
        <div className="nav-scroller">
          <Link href="/" className="navbar-brand">
            <Image src="/images/brand/logo/logo.svg" alt="" />
          </Link>
        </div>
        <Accordion defaultActiveKey="0" as="ul" className="navbar-nav flex-column">
          {DashboardMenu.map((menu, index) => {
            if (menu.grouptitle) {
              return (
                <Card bsPrefix="nav-item" key={index}>
                  <div className="navbar-heading">{menu.title}</div>
                </Card>
              );
            } else {
              if (menu.children) {
                return (
                  <Fragment key={index}>
                    <CustomToggle eventKey={index} icon={menu.icon}>
                      {menu.title}
                      {menu.badge ? (
                        <Badge className="ms-1" bg={menu.badgecolor ? menu.badgecolor : "primary"}>
                          {menu.badge}
                        </Badge>
                      ) : ("")}
                    </CustomToggle>
                    <Accordion.Collapse eventKey={index} as="li" bsPrefix="nav-item">
                      <ListGroup as="ul" bsPrefix="" className="nav flex-column">
                        {menu.children.map((menuLevel1Item, menuLevel1Index) => {
                          return (
                            <ListGroup.Item as="li" bsPrefix="nav-item" key={menuLevel1Index}>
                              {generateLink(menuLevel1Item)}
                            </ListGroup.Item>
                          );
                        })}
                      </ListGroup>
                    </Accordion.Collapse>
                  </Fragment>
                );
              } else {
                return null; // Elimina los elementos que no tienen children
              }
            }
          })}
        </Accordion>
      </SimpleBar>
    </Fragment>
  );
};

export default NavbarVertical;

