import withReactContent from 'sweetalert2-react-content';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import { FavoriteState, removeItem } from '../reducer/favoriteSlice';

import { Layout, Section } from '../components/Layout';
import { GetMovieType } from '../utils/movieType';
import { Card } from '../components/Card';
import swal from '../utils/swal';

export const Favorites = () => {
  const MySwal = withReactContent(swal);

  const dispatch = useDispatch();
  const favorite = useSelector(
    (state: { favorite: FavoriteState }) => state.favorite
  );

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
