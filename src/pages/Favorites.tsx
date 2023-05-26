import { FC, useState, useEffect } from 'react';
import { Layout, Section } from '../components/Layout';
import { Card } from '../components/Card';
import Spinner from '../components/Loading';
import { GetMovieType } from '../utils/movieType';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
import withReactContent from 'sweetalert2-react-content';
import swal from '../utils/swal';

interface DatasState {
  isLoading: boolean;
  datasFavo: Array<GetMovieType>;
}

export const Favorites: FC<DatasState> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [datasFavo, setDatasFavo] = useState([]);

  const MySwal = withReactContent(swal);

  const navigate = useNavigate();

  const fetchFavo = async (code: string) => {
    setIsLoading(true);
    await api
      .getFavo(code)
      .then((response) => {
        const { data } = response.data.results;
        setDatasFavo(data);
        console.log(response);
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

  useEffect(() => {
    fetchFavo('19622220');
  }, []);

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
          {isLoading ? (
            <div className="w-full grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-5">
              {datasFavo.map((item: GetMovieType) => {
                return (
                  <Card
                    key={item.id}
                    id={`movie-${item.title}`}
                    title={item.title}
                    description={item.overview}
                    image={item.poster_path}
                    onClick={() => navigate(`${item.id}`)}
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

export default Favorites;
