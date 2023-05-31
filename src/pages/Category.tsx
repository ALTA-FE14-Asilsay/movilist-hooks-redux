import withReactContent from 'sweetalert2-react-content';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Layout, Section } from '../components/Layout';
import { Card } from '../components/Card';
import { GetMovieType } from '../utils/movieType';
import Spinner from '../components/Loading';
import api from '../utils/api';
import swal from '../utils/swal';

const Category = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [datasCategory, setDatasCategory] = useState<GetMovieType[]>([]);
  const navigate = useNavigate();
  const MySwal = withReactContent(swal);
  const params = useParams();

  const { movie_category } = params;

  const fetchCategory = async (code: any) => {
    setIsLoading(true);
    await api
      .getAll(code)
      .then((response) => {
        const { results } = response.data;
        setDatasCategory(results);
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

  const handleNav = (movie_id?: number) => {
    navigate(`/detail/${movie_id}`, {
      state: {
        movie_id: movie_id,
      },
    });
  };

  function dedicatedMount() {
    fetchCategory(movie_category);
  }

  useEffect(() => {
    dedicatedMount();
  }, []);

  return (
    <Layout>
      <Section
        addClass="bg-base-100 px-16 lg:px-24 py-16 pt-16 "
        id={`${movie_category}-section-page`}
      >
        <div className="w-full min-h-screen flex flex-col items-center gap-5">
          <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
            {movie_category === 'now_playing'
              ? 'now playing'
              : movie_category === 'top_rated'
              ? 'top rated'
              : movie_category}{' '}
            MOvie
          </p>
          {datasCategory && isLoading === true ? (
            <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5">
              {datasCategory.map((prop: GetMovieType) => {
                return (
                  <Card
                    key={`card-${prop.id}`}
                    button_label="Detail"
                    item={prop}
                    onClick={() => handleNav(prop.id)}
                  />
                );
              })}
            </div>
          ) : (
            <div className="w-full bg-base-100 h-[450px] flex items-center justify-center">
              <Spinner />
            </div>
          )}
        </div>
      </Section>
    </Layout>
  );
};

export default Category;
