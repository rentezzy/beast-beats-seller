import { Form, Formik } from "formik";
import * as Yup from "yup";
import { useGetAppInfoQuery } from "../../store/slices/api/appApi";
import { useGetArtistsQuery } from "../../store/slices/api/artistsApi";
import { MyButton, MyRange, MySelect } from "../ui/Controls";
import styles from "./Store.module.css";

const FilterForm = () => {
  const { data: artistsData } = useGetArtistsQuery(null);
  const { data: appData } = useGetAppInfoQuery(null);
  let artists: string[] = [];
  if (artistsData) {
    artists = artistsData.map((user) => user.username);
  }
  return (
    <div className={styles.filterForm}>
      <h2>Filters</h2>
      <Formik
        initialValues={{
          genre: "all",
          author: "all",
          priceFrom: 0,
          priceTo: appData?.maxPrice,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
        validationSchema={Yup.object({
          genre: Yup.string(),
          author: Yup.string(),
          priceFrom: Yup.number(),
          priceTo: Yup.number(),
        })}
      >
        <Form>
          <div className={styles.filterForm__selects}>
            <MySelect name="genre" type="" label="genre">
              <option value="all">All</option>
              {appData?.genres.map((genre, index) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </MySelect>
            <MySelect name="author" type="" label="author">
              <option value="all">All</option>
              {artists?.map((artist) => (
                <option key={artist} value={artist}>
                  {artist}
                </option>
              ))}
            </MySelect>
          </div>
          <MyRange
            nameFrom="priceFrom"
            nameTo="priceTo"
            label="price"
            labelFrom="from:"
            labelTo="to:"
          />
          <MyButton type="submit">SEARCH</MyButton>
        </Form>
      </Formik>
    </div>
  );
};

export default FilterForm;
