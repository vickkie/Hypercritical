import React from "react";
import { createRoot } from "react-dom/client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      selectedPartner: null,
      windowWidth: window.innerWidth,
      drawerKey: 0,
    };
  }

  componentDidMount() {
    document.querySelectorAll(".partner").forEach((button, i) => {
      button.addEventListener("click", (event) => {
        const partnerData = {
          heading: event.target.closest(".partner").dataset.heading,
          intro: event.target.closest(".partner").dataset.intro,
          link: event.target.closest(".partner").dataset.link,
          logo: event.target.closest(".partner").dataset.logo,
        };

        console.log("Project data:", partnerData);
        this.setState({ isDrawerOpen: true, selectedPartner: partnerData });
      });
    });
    window.addEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    // simple counter as the key
    this.setState((prevState) => ({
      windowWidth: window.innerWidth,
      drawerKey: prevState.drawerKey + 1, // Increment the key
    }));
  };

  closeModal = () => {
    gsap
      .timeline({ defaults: { ease: "power4.inOut" } })
      .addLabel("start", "+=0")
      .to(
        ".partner-modal",
        {
          duration: 0.1,
          opacity: 0,
        },
        "start"
      )
      .to(
        ".partner-modal",
        {
          duration: 0.3,
          scale: 0,
        },
        "start"
      );
  };

  componentWillUnmount() {
    document.querySelectorAll(".partner").forEach((button) => {
      button.removeEventListener("click");
    });
    window.removeEventListener("resize", this.handleResize);
  }

  toggleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  };

  render() {
    const { isDrawerOpen, selectedPartner } = this.state;
    if (!isDrawerOpen || !selectedPartner) return null;

    return (
      <div className="partner-modal-inner">
        <div className="partner-divide">
          <button className="partner-close" onClick={this.closeModal}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="m19.65,16.79l-.13-.13-6.66-6.66,6.66-6.66.13-.13c.23-.23.36-.55.35-.88,0-.33-.14-.65-.38-.89l-1.06-1.06C18.32.14,18,0,17.67,0s-.65.12-.88.35l-.13.13-6.66,6.66L3.34.49l-.13-.13C2.98.12,2.66,0,2.33,0c-.33,0-.65.14-.89.38L.38,1.44C.14,1.68,0,2,0,2.33c0,.33.12.65.35.88l.13.13,6.66,6.66L.49,16.66l-.13.13c-.23.23-.36.55-.35.88,0,.33.14.65.38.89l1.06,1.06c.24.24.56.37.89.38.33,0,.65-.12.88-.35l.13-.13,6.66-6.66,6.66,6.66.13.13c.23.23.55.36.88.35.33,0,.65-.14.89-.38l1.06-1.06c.24-.24.37-.56.38-.89,0-.33-.12-.65-.35-.88Z"></path>
            </svg>
          </button>
          <div className="partner-left">
            <div className="partner-left-inner">
              <a href={selectedPartner.link} target="_blank" rel="noopener noreferrer">
                <span>
                  <img src={selectedPartner.logo} alt={selectedPartner.heading} />
                </span>
              </a>
            </div>
          </div>
          <div className="partner-right">
            <div className="partner-pill">Our partner</div>
            <h3>{selectedPartner.heading}</h3>
            <div className="partner-intro">
              <div className="more-explanation">{selectedPartner.intro}</div>
            </div>
            <a href={selectedPartner.link} className="view-parnerbutton" target="_blank" rel="noopener noreferrer">
              <span className="inline-flex">
                <span>Find out more</span>
                <div className="viewbutton">
                  <div className="Button_Arrow__LawjV">
                    <svg width="31" height="28" viewBox="0 0 31 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.857198 13.7372L27.9141 13.7372" stroke="black" strokeWidth="3"></path>
                      <path d="M15.4561 1.39417L27.9142 13.8522L15.4561 26.3104" stroke="black" strokeWidth="3"></path>
                    </svg>
                  </div>
                </div>
              </span>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const container = document.getElementById("partner-modal");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
} else {
  console.error("Container element not found");
}
