import React from "react";
import { createRoot } from "react-dom/client";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      selectedProject: null,
      windowWidth: window.innerWidth,
      drawerKey: 0,
    };
  }

  componentDidMount() {
    document.querySelectorAll(".work-tile").forEach((button, i) => {
      button.addEventListener("click", (event) => {
        // console.log(`clicked-${i}`);
        const mediaAttr = event.target.closest(".work-tile").dataset.media;
        const mediaUrls = mediaAttr ? mediaAttr.split(" || ") : [];
        const projectData = {
          heading: event.target.closest(".work-tile").dataset.heading,
          year: event.target.closest(".work-tile").dataset.year,
          text: event.target.closest(".work-tile").dataset.text,
          media: mediaUrls,
        };
        // console.log("Project data:", projectData);

        this.setState({ isDrawerOpen: true, selectedProject: projectData });
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

  componentWillUnmount() {
    document.querySelectorAll(".work-tile").forEach((button) => {
      button.removeEventListener("click");
    });
    window.removeEventListener("resize", this.handleResize);
  }

  toggleDrawer = () => {
    this.setState({ isDrawerOpen: !this.state.isDrawerOpen });
  };

  render() {
    return (
      <div key={this.state.drawerKey} className={this.state.isDrawerOpen ? "work-drawer open" : "work-drawer"}>
        <div className="drawer-wrapper" id="drawer-wrapper">
          <div id="close" className="closeDrawer" onClick={this.toggleDrawer}>
            {
              <svg viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  vectorEffect="non-scaling-stroke"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4.89263 5.46714C5.23798 5.8069 5.23798 6.36372 4.89263 6.70348L0.372703 11.1502C0.189372 11.3305 0.189372 11.6261 0.372703 11.8065C0.551847 11.9827 0.839231 11.9827 1.01838 11.8065L5.56921 7.32938C5.90668 6.99737 6.44806 6.99737 6.78553 7.32938L11.3373 11.8074C11.5164 11.9836 11.8038 11.9836 11.983 11.8074C12.1663 11.627 12.1663 11.3315 11.983 11.1511L7.46212 6.70349C7.11676 6.36372 7.11676 5.8069 7.46212 5.46714L12.2172 0.789098C12.4005 0.608738 12.4005 0.313152 12.2172 0.132792C12.0381 -0.0434502 11.7507 -0.0434501 11.5715 0.132792L6.78553 4.84125C6.44806 5.17325 5.90668 5.17325 5.56921 4.84125L0.784148 0.133708C0.605003 -0.042534 0.317619 -0.042534 0.138474 0.133708C-0.0448562 0.314068 -0.044856 0.609654 0.138475 0.790015L4.89263 5.46714Z"
                  fill="#0E0E0E"
                ></path>
              </svg>
            }
          </div>

          <div className="inner">
            <div className="scroll-wrapper">
              <div className="header-wrapper">
                <p className="heading" dangerouslySetInnerHTML={{ __html: this.state.selectedProject?.heading }}></p>
                <p className="year">{this.state.selectedProject?.year}</p>
              </div>
              <div className="copy-wrapper">
                <div className="copy">{this.state.selectedProject?.text}</div>
                <a className="work-link" href="">
                  View full case study
                </a>
              </div>
              <div className="tile-wrapper">
                <div className="tiles">
                  {this.state.selectedProject?.media.map((mediaUrl, index) => (
                    <div className="media-wrapper" key={index}>
                      {mediaUrl.endsWith(".mp4") || mediaUrl.endsWith(".webm") ? (
                        <video muted={true} loop={true} autoPlay={true} playsInline={true}>
                          <source src={mediaUrl} type={mediaUrl.endsWith(".mp4") ? "video/mp4" : "video/webm"} />
                        </video>
                      ) : (
                        <img src={mediaUrl} alt="" />
                      )}
                    </div>
                  ))}
                </div>
                <a className="tile view-all work-link" href="">
                  <p>
                    View full
                    <br /> case study
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const container = document.getElementById("projects-drawer");
const root = createRoot(container);

root.render(<App />);
