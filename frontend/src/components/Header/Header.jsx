import React, { useEffect, useRef } from "react";
import Logo from "../../img/logo.svg";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
import cn from "classnames";
import { useNavigate } from "react-router-dom";

const Header = ({ page, children, isBurger }) => {
  const ref = useRef(null);
  const navigate = useNavigate();

  function setHeaderScrollPadding() {
    const height = ref.current.clientHeight;
    document.body.style.scrollPaddingTop = `${height}px`;
    document.documentElement.style.scrollPaddingTop = `${height}px`;
  }

  useEffect(() => {
    window.addEventListener("load", setHeaderScrollPadding);
    return () => {
      window.removeEventListener("load", setHeaderScrollPadding);
    };
  });
  const onMenuOpen = () => {
    store.setMenuToggle();
    document.body.style.overflowY = store.isMenuOpen ? "hidden" : "scroll";
  };

  const onLogoClick = () => {
    navigate("/");
  };

  return (
    <header
      className={cn(
        "header",
        { "menu-open": store.isMenuOpen },
        { "header-relative": page !== "main" }
      )}
      ref={ref}
    >
      <div className="container">
        <div className="menu__wrapper">
          <div className="menu__logo" onClick={onLogoClick}>
            <img src={Logo} alt="logo" className="logo__img" />
            <div className="logo__text">Grand Уют</div>
          </div>
          {isBurger ? (
            <>
              <button
                className={cn("menu__burger", {
                  "menu-open": store.isMenuOpen,
                })}
                onClick={onMenuOpen}
              >
                <span />
              </button>
              {window.innerWidth < 635 ? (
                <nav
                  className={cn("menu__nav", { "menu-open": store.isMenuOpen })}
                  onClick={onMenuOpen}
                >
                  {children.map((item) => item)}
                </nav>
              ) : (
                <nav className={"menu__nav"}>
                  {children.map((item) => item)}
                </nav>
              )}
            </>
          ) : (
            <nav className={"menu__nav-one"}>
              {children.map((item) => item)}
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default observer(Header);
