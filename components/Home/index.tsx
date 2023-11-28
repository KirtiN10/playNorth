import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from 'next/image';
import SearchIcon from '../../public/search.svg';
import styles from './Home.module.scss';
import { gameApi, gameState } from "../../store/slices/gameSlice";
import { AppDispatch } from "../../store";

interface HomeProps {
  config: { menu: { lobby: { items: CategoryItem[] } } }
}

const Home = ({ config }: HomeProps) => {
  const { items } = config?.menu?.lobby || [];
  items.sort((a, b) => a.name.localeCompare(b.name));

  const [selectedCategory, setSelectedCategory] = useState("")
  const [search, setSearch] = useState("")
  const [mainSearch, setMainSearch] = useState("")

  const dispatch = useDispatch<AppDispatch>()
  const { games: { items: gameItems }, isLoading } = useSelector(gameState);

  const onSearch = () => {
    setMainSearch(search);
  }

  useEffect(() => {
    setSelectedCategory(items[0]?.path)
  }, [])

  const onChangeCateogory = (catItem: CategoryItem) => {
    setSelectedCategory(catItem?.path)
  }

  useEffect(() => {
    if (selectedCategory) {
      const parts = selectedCategory.split('/');
      const slug = parts[parts.length - 1];
      const _slug = slug === "all-games" ? "" : slug
      dispatch(gameApi({ category: _slug, search: mainSearch }))
    }
  }, [selectedCategory, mainSearch])

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <h1>North Play</h1>
          <ul>
            {items.map(item => (
              <li
                key={item.id}
                className={item.path === selectedCategory ? styles.active : undefined}
                onClick={() => onChangeCateogory(item)}>
                  <span>{item?.name}</span>
              </li>
            ))}
          </ul>
        </aside>

        <div className={styles.game}>
          <div className={styles.searchBar}>
            <input
              type="text"
              className={styles.formControl}
              placeholder="Search...."
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
            />
            <button
              onClick={onSearch}
            ><Image src={SearchIcon} alt="search" /></button>

          </div>
          <section className={styles.game__list} id="game-listing">
           
              {isLoading ? <span className="loader"></span> :
                gameItems.length ? gameItems?.map(game => (
                  <div className={styles.card} key={game.id}>
                    <div className={styles.image}>
                      <Image
                        src={game?.image?.thumbnail?.src ?? ""}
                        width={"100%"}
                        height={"150"}
                        alt='Games-thumbnail'
                      />
                    </div>
                    <p className={styles.game__title}>{game?.gameText}</p>
                  </div>
                )) : (
                  <span>
                    No Data
                  </span>
                )}
          </section>
        </div>
      </main>
    </div>
  )
}

export default Home


