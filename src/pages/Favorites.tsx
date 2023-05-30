import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { FC, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { FavoriteState, Item, removeItem } from '../reducer/favoriteSlice';

import { Layout, Section } from '../components/Layout';
import { GetMovieType } from '../utils/movieType';
import Spinner from '../components/Loading';
import { Card } from '../components/Card';
import swal from '../utils/swal';
import api from '../utils/api';

export const Favorites = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [datasFavo, setDatasFavo] = useState<GetMovieType[]>([]);

  const MySwal = withReactContent(swal);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const favorite = useSelector(
    (state: { favorite: FavoriteState }) => state.favorite
  );

  const handleNav = (movie_id?: number) => {
    navigate(`/detail/${movie_id}`, {
      state: {
        movie_id: movie_id,
      },
    });
  };

  const fetchFavo = async (code: string) => {
    setIsLoading(true);
    await api
      .getFavo(code)
      .then((response) => {
        const { data } = response.data.results;
        setDatasFavo(data);
      })
      .catch((error) => {
        MySwal.fire({
          icon: 'error',
          title: 'Failed',
          text: `error :  ${error.message}`,
          showCancelButton: false,
        });
      })
      .finally(() => setIsLoading(false));
  };

  const RemoveFromFavorite = (item: any) => {
    dispatch(removeItem(item));

    MySwal.fire({
      icon: 'success',
      title: 'Success Added',
      text: 'Successfully add to Favorite',
      showCancelButton: false,
      confirmButtonText: 'OK',
    });
  };

  useEffect(() => {
    console.log('add to favorite : ', favorite.items);
  }, [favorite.items]);

  return (
    <Layout>
      <Section
        addClass="bg-base-100 px-16 lg:px-24 py-16 pt-16 "
        id="now-playing-section"
      >
        <div className="w-full min-h-screen flex flex-col items-center gap-5">
          <p className="text-3xl mb-6 tracking-wider uppercase font-semibold ">
            My Favorites
          </p>

          <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5">
            {favorite.items.map((prop: GetMovieType) => {
              return (
                <Card
                  key={`card-${prop.id}`}
                  button_label="Remove"
                  item={prop}
                  onClick={() => RemoveFromFavorite(prop.id)}
                />
              );
            })}
          </div>
        </div>
      </Section>
    </Layout>
  );
};

export default Favorites;
