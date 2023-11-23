import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import './Card.css';
import Details from './Details';

function Card({ movie }) {
  const [showDetails, setShowDetails] = useState(false);
  const [nameHovered, setNameHovered] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [comments, setComments] = useState([]);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleMoreClick = () => {
    setShowDetails(!showDetails);
  };

  const handleCommentSubmit = (newComment) => {
    setComments([...comments, newComment]);
  };

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) {
      setDisliked(false);
    }
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) {
      setLiked(false);
    }
  };

  return (
    <div className="col-6 col-md-4">
      <div className="card">
        <img
          src={`./images/${movie.poster}`}
          className="card-img-top"
          alt={movie.title}
          onMouseOver={() => setLogoHovered(true)}
          onMouseOut={() => setLogoHovered(false)}
        />
        <div className="card-body">
          <h5
            className={`card-title ${nameHovered ? getAffiliationColor(movie.best_character.affiliation) : ''}`}
            onMouseOver={() => setNameHovered(true)}
            onMouseOut={() => setNameHovered(false)}
          >
            {movie.title}
          </h5>
          <h6 className="card-subtitle">{movie.year}</h6>
          <div className="thumbs-container">
            <FontAwesomeIcon
              icon={faThumbsUp}
              className={`thumb-icon ${liked ? 'liked' : ''}`}
              onClick={handleLike}
            />
            <FontAwesomeIcon
              icon={faThumbsDown}
              className={`thumb-icon ${disliked ? 'disliked' : ''}`}
              onClick={handleDislike}
            />
          </div>
          <a href="#" className="card-link" onClick={handleMoreClick}>More...</a>
          {showDetails && (
            <Details
              movie={movie}
              onCommentSubmit={handleCommentSubmit}
              comments={comments}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;

// Función para obtener el color del nombre según la afiliación
function getAffiliationColor(affiliation) {
  switch (affiliation) {
    case 'Jedi':
    case 'Rebel':
      return 'blue-text';
    case 'Empire':
    case 'Sith':
      return 'red-text';
    default:
      return '';
  }
}