import "./listItem.scss";
import {
  Add,
  PlayArrow,
  ThumbDownOutlined,
  ThumbsUpDownOutlined,
  ThumbUpAltOutlined,
} from "@material-ui/icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
  console.log("index", item);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/api/movies/find/" + item,
          {
            headers: {
              token:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDVkY2QyODBhYWIwMDgyOTM0NjJmMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0ODc0NTczNywiZXhwIjoxNjQ5MTc3NzM3fQ._mdvS_JCjzzQpOhyl_Jud2JLTxTgtaCN4X8PoZwG-4Q",
            },
          }
        );
        console.log(res.data);
        setMovie(res.data);
      } catch (err) {
        console.log("listItam failed", err);
      }
    };
    getMovie();
  }, [item, index]);

  const trailer =
    "https://player.vimeo.com/video/253989945?h=c6db007fe5&color=ef0800&title=0&byline=0&portrait=0";
  return (
    <Link
      to={{
        pathname: "/watch",
        search: "?sort=name",
        hash: "#the-hash",
        state: { fromDashboard: true },
      }}
    >
      <div
        className="listItem"
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={movie?.imgTitle} alt="" />
        {isHovered && (
          <>
            <video src={movie.trailer} autoPlay={true} loop />
            <div className="itemInfo">
              <div className="icons">
                <PlayArrow className="icon" />
                <Add className="icon" />
                <ThumbUpAltOutlined className="icon" />
                <ThumbDownOutlined className="icon" />
              </div>
              <div className="itemInfoTop">
                <span>{movie.duration}</span>
                <span className="limit">+{movie.limit}</span>
                <span>{movie.year}</span>
              </div>
              <div className="desc">{movie.desc}</div>
              <div className="genre">{movie.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  );
};