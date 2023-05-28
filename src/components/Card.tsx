import React, { FC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GetMovieType } from '../utils/movieType';

interface CardProps {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  onClick?: React.MouseEventHandler;
}

interface CardPropsType {
  item: GetMovieType;
  navigate?: string;
  button_label: string;
  loading?: boolean;
  onClick?: React.MouseEventHandler;
}

export const Card: FC<CardProps> = ({ title, image, onClick }) => {
  return (
    <div className="card card-compact h-max w-full bg-base-200 shadow-xl">
      <figure className="h-3/4 pt-3 px-3">
        <img
          src={`${
            image
              ? `https://image.tmdb.org/t/p/w500${image}`
              : 'https://placehold.co/500x750/png?text=No+Image+Preview&font=roboto'
          }`}
          alt={`movie ${title}`}
          className="h-full object-cover rounded-2xl"
        />
      </figure>
      <div className="card-body h-1/4 items-center">
        <div className="min-h-16 text-center">
          <h2 className="text-base md:text-lg font-semibold">{title}</h2>
        </div>
        <div className="flex w-full justify-end">
          <button
            id={`nav-${title}`}
            onClick={onClick}
            className="btn btn-primary "
          >
            Detail
          </button>
        </div>
      </div>
    </div>
  );
};

export const HeroesCard: FC<CardPropsType> = (CardPropsType) => {
  const { button_label, item, onClick } = CardPropsType;

  return (
    <div className=" h-72 w-72 md:h-80 md:w-80 lg:h-96 lg:w-96 rounded-2xl shadow-2xl">
      <div
        className="group w-full h-full bg-cover bg-center rounded-2xl p-2"
        style={
          item.backdrop_path
            ? {
                backgroundImage: `url("https://image.tmdb.org/t/p/w500${item.backdrop_path}")`,
              }
            : {
                backgroundImage: `url("https://placehold.co/500x750/png?text=No+Image+Preview&font=roboto`,
              }
        }
      >
        <div className="w-full h-full bg-neutral/70 rounded-2xl hover:opacity-100 opacity-0 transition-opacity duration-200 ease-in-out">
          <div className="p-5 h-full flex flex-col justify-between items-center">
            <div className="min-h-[72px] w-full text-neutral-content">
              <h2 className="text-lg text-center md:text-lg font-bold tracking-wide">
                {item.title}
              </h2>

              <p className="text-base line-clamp-4">{item.overview}</p>
            </div>

            <button
              id={`nav-${item.title}`}
              className="btn btn-primary btn-wide"
              onClick={onClick}
            >
              {button_label}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
