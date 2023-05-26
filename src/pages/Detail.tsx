import { FC, useState, useEffect } from 'react';

import { GetGenresType, GetMovieType, GetDetailType } from '../utils/movieType';
import { Layout, Section } from '../components/Layout';
import Spinner from '../components/Loading';
import { Card } from '../components/Card';
import api from '../utils/api';

import swal from '../utils/swal';
import withReactContent from 'sweetalert2-react-content';
import { useLocation, useNavigate } from 'react-router-dom';

export const Detail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [datasSimilar, setDatasSimilar] = useState<GetMovieType[]>([]);
  const [dataDetail, setDataDetail] = useState<GetDetailType>({});

  const MySwal = withReactContent(swal);

  const id = location?.state?.movie_id;

  const fetchDetail = async (code: string) => {
    setIsLoading(true);
    await api
      .getAll(code)
      .then((response) => {
        const { data } = response;
        setDataDetail(data);
        console.log(dataDetail);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  const fetchSimilar = async (code: string) => {
    setIsLoading(true);
    await api
      .getAll(code)
      .then((response) => {
        const { results } = response.data;
        setDatasSimilar(results);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      });
  };

  function dedicatedMount() {
    fetchDetail(id);
    fetchSimilar(`${id}/similar`);
  }

  const handleNav = (movie_id?: number) => {
    navigate(`/detail/${movie_id}`, {
      state: {
        movie_id: movie_id,
      },
    });
  };

  useEffect(() => {
    dedicatedMount();
  }, [dedicatedMount]);

  return (
    <Layout>
      <Section
        addClass="bg-base-100 px-16 lg:px-24 py-6 pt-16 "
        id="now-playing-section"
      >
        <div className="w-full min-h-screen flex flex-col items-center">
          <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
            {dataDetail.title}
          </p>
          <div className="flex gap-4 justify-center">
            <figure className="">
              <img
                src={`${
                  dataDetail.poster_path
                    ? `https://image.tmdb.org/t/p/w500${dataDetail.poster_path}`
                    : 'https://placehold.co/500x750/png?text=No+Image+Preview&font=roboto'
                }`}
                alt={dataDetail.title}
                className="w-96 rounded-2xl "
              />
            </figure>
            <div className="flex flex-col w-2/5 justify-between">
              <div className="">
                <p className="font-semibold tracking-wide">
                  Runtime:{' '}
                  <span className="tracking-normal font-normal">
                    {dataDetail.runtime} minutes
                  </span>
                </p>
                <p className="font-semibold tracking-wide">
                  Genre:{' '}
                  <span className="tracking-normal font-normal">
                    {dataDetail.genres?.map((item: GetGenresType) => {
                      return (
                        <>
                          {item.name}
                          {', '}
                        </>
                      );
                    })}
                  </span>
                </p>
                <p className="font-semibold tracking-wide">
                  Language:{' '}
                  <span className="tracking-normal font-normal">
                    {dataDetail.original_language}
                  </span>
                </p>
                <p className="font-semibold tracking-wide">
                  Status:{' '}
                  <span className="tracking-normal font-normal">{status}</span>
                </p>
                <p className="font-semibold tracking-wide">
                  Description:{' '}
                  <span className="tracking-normal font-normal">
                    {dataDetail.overview}
                  </span>
                </p>
              </div>
              <div className="w-full flex justify-end">
                <div className="flex gap-3">
                  <button
                    id="nav-favorite"
                    className="btn btn-primary "
                  >
                    Add to favorite
                  </button>
                  <button
                    id="nav-watch"
                    className="btn btn-outline btn-primary"
                  >
                    Watch
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
      <Section
        addClass="bg-base-200 px-16 lg:px-24 py-16 !min-h-full"
        id="upcoming-movie-section"
      >
        <div className="w-full flex flex-col  items-center gap-5">
          <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
            Similiar Movie
          </p>
          {datasSimilar && isLoading === true ? (
            <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5">
              {datasSimilar.slice(0, 4).map((item: GetMovieType) => {
                return (
                  <Card
                    key={item.id}
                    id={`movie-${item.title}`}
                    title={item.title}
                    description={item.overview}
                    image={item.poster_path}
                    onClick={() => handleNav(item.id)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full bg-slate-400 h-[450px] flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </Section>
    </Layout>
  );
};

export default Detail;
