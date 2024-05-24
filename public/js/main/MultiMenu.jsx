import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Multimenu from "./projects/multimenu";

class UziMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: false,
      windowWidth: window.innerWidth,
      menuKey: 0,
    };
  }

  // const [rendered, setrendered] = useState("");

  componentDidMount() {
    this.setState({ isMounted: true });
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    // simple counter as the key
    this.setState((prevState) => ({
      windowWidth: window.innerWidth,
      menuKey: prevState.menuKey + 1, // Increment the key
    }));
  };

  render() {
    const LaptopMenu = () => {
      return (
        <>
          <div className="sidemenuUzi" key={this.state.menuKey}>
            <a href="studio" className="sidemenuUzi__item transit" data-cursor="-medium -exclusion">
              <span className="sidemenuUzi__item-inner">The studio</span>
            </a>{" "}
            <a href="privacy" className="sidemenuUzi__item transit" data-cursor="-medium -exclusion">
              <span className="sidemenuUzi__item-inner">Privacy</span>
            </a>{" "}
            <a href="terms" className="sidemenuUzi__item transit" data-cursor="-medium -exclusion">
              <span className="sidemenuUzi__item-inner">Terms</span>
            </a>{" "}
            <a href="#" className="sidemenuUzi__item" data-cursor="-medium -exclusion">
              <span className="sidemenuUzi__item-inner">••••</span>
            </a>{" "}
            <a href="login" className="sidemenuUzi__item transit" data-cursor="-medium -exclusion">
              <span className="sidemenuUzi__item-inner">Enter</span>
            </a>{" "}
            <a href="membership_signup" className="sidemenuUzi__item transit" data-cursor="-medium -exclusion">
              <span className="sidemenuUzi__item-inner">Join</span>
            </a>{" "}
            <a href="#" className="sidemenuUzi__item">
              <span className="sidemenuUzi__item-inner">•••</span>
            </a>
          </div>
        </>
      );
    };

    const PhoneMenu = () => {
      return (
        <>
          <div className="title-upper">social networks</div>
          <div className="socials-buttons">
            <a
              target="_blank"
              className="social-networks instagram transit"
              aria-label="instagram"
              style={{ backgroundColor: "rgba(1,1,1,0)" }}
              href="https://www.instagram.com/u.z.i.__"
            >
              <img
                src="assets/svg/g_instagram.png"
                alt="Instagram icon, png, black"
                className="social-img"
                data-label=""
                style={{ filter: "invert(0%)" }}
              />
            </a>
            <a
              target="_blank"
              className="social-networks github transit"
              aria-label="github"
              style={{ backgroundColor: "rgba(1,1,1,0)" }}
              href="https://www.github.com/vickkie"
            >
              <img
                src="assets/svg/icons8-github.svg"
                data-label=""
                alt=""
                className="social-img"
                style={{ filter: "invert(0%)" }}
              />
            </a>
            <a
              target="_blank"
              className="social-networks w-inline-block linktree transit"
              aria-label="linktree"
              href="https://linktr.ee/uzitrake"
            >
              <img
                src="assets/svg/linktree.svg"
                alt=""
                className="social-img"
                data-label=""
                style={{ filter: "invert(0%)" }}
              />
            </a>
            <a
              className="social-networks w-inline-block transit"
              aria-label="menu-login"
              href="/login"
              style={{ position: "absolute", right: "1.5rem" }}
            >
              <img
                src="assets/svg/enter-arrow.svg"
                alt="login arro"
                className="social-img"
                data-label=""
                style={{ filter: "invert(0%)", transform: "rotate(180deg)" }}
              />
            </a>
          </div>
        </>
      );
    };

    //?Important to give gsap time to animate menu

    setTimeout(() => {
      Multimenu();
    }, 1000);

    // Determine which component to render based on window width
    let ComponentToRender;
    if (this.state.windowWidth > 768) {
      // width  breakpoint
      ComponentToRender = () => <LaptopMenu />;
    } else {
      ComponentToRender = () => <PhoneMenu />;
    }

    console.log("isMounted");

    return <ComponentToRender />;
  }
}

const renderMenu = () => {
  const container = document.querySelector(".menuUzi__item--3 .menuUzi__item-inner");
  if (container) {
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <UziMenu />
      </React.StrictMode>
    );

    //?Important to give gsap time to animate menu

    // setTimeout(() => {
    //   Multimenu();
    // }, 1000);
  } else {
    console.error("Element with your root id is not found");
  }
};

document.addEventListener("DOMContentLoaded", renderMenu);
