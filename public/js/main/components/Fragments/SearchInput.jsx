import React from "react";
import SearchIcon from "@mui/icons-material/Search";

class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
    };
  }

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    this.setState({ isFocused: false });
  };

  render() {
    const { isFocused } = this.state;
    const { searchQuery, setSearchQuery } = this.props; // Destructure searchQuery and setSearchQuery from props

    return (
      <div style={{ position: "relative", display: "inline-block" }}>
        <input
          type="text"
          placeholder={isFocused ? "" : "Search name"}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          style={{ paddingLeft: "14px" }}
          className="searchbyname"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Use setSearchQuery from props to update the search query
        />
        {!isFocused && (
          <div
            style={{
              position: "absolute",
              left: "18px",
              top: "50%",
              transform: "translateY(-50%) scale(0.8)",
              display: "flex",
              color: "var(--color-black)",
            }}
          >
            <SearchIcon style={{ opacity: "0.7" }} />
          </div>
        )}
      </div>
    );
  }
}

export default SearchInput;
