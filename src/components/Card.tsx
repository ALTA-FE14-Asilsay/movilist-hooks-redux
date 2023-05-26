import React, { FC } from 'react';

interface CardProps {
  id: string;
  title?: string;
  description?: string;
  image?: string;
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

export const HeroesCard: FC<CardProps> = ({ title, image, onClick }) => {
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
