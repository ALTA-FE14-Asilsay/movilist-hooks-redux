import React, { Component } from 'react';

interface CardProps {
  id: string;
  title?: string;
  description?: string;
  image?: string;
  onClick?: React.MouseEventHandler;
}

export class Card extends Component<CardProps> {
  render() {
    const { title, image, onClick } = this.props;

    return (
      <div className="card card-compact h-max w-full bg-base-200 shadow-xl">
        <figure className="h-3/4 pt-3 px-3">
          <img
            src={`https://image.tmdb.org/t/p/w500${image}`}
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
  }
}

export class HeroesCard extends Component<CardProps> {
  render() {
    const { title, image } = this.props;

    return (
      <div className="card image-full w-[400px] rounded-lg shadow-2xl bg-base-200">
        <figure className="h-3/4 pt-3 px-3">
          <img
            src={`https://image.tmdb.org/t/p/w500${image}`}
            alt={`movie ${title}`}
            className="h-full object-cover rounded-2xl"
          />
        </figure>
        <div className="card-body h-1/4 items-center">
          <div className="min-h-16 text-center">
            <h2 className="text-base md:text-lg font-semibold">{title}</h2>
          </div>
          <div className="flex w-full justify-end">
            <button className="btn btn-primary ">Detail</button>
          </div>
        </div>
      </div>
    );
  }
}
