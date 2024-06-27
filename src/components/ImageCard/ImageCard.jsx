import { SlLike } from "react-icons/sl";

import { FiUserCheck } from "react-icons/fi";
import css from "./ImageCard.module.css";

const ImageCard = ({
    item: {
        alt_description: alt,
        urls: { small, regular },
        user: { name },
        likes,
    },
    onOpen,
}) => {
    return (
        <div className={css.item}>
            <img
                className={css.image}
                src={small}
                alt={alt}
                width={360}
                onClick={() => {
                    onOpen(regular, alt);
                }}
            />
            <div className={css.descr}>
                <p>
                    <SlLike color="red" className={css.icon} />
                    <b>Likes: </b>
                    {likes}
                </p>
                {name !== null && (
                    <p className={css.text}>
                        <FiUserCheck color="red" className={css.icon} />
                        <b>Author: </b>
                        {name}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ImageCard;
