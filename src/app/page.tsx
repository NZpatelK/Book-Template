'use client';
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";


export default function Home() {


  const [isBigScreen, setIsBigScreen] = useState(true);


  useEffect(() => {
    const checkScreenSize = () => {
      setIsBigScreen(window.innerWidth >= 1180 && window.innerHeight >= 820);
    };

    checkScreenSize(); // Check initial screen size

    window.addEventListener('resize', checkScreenSize); // Update on resize

    return () => window.removeEventListener('resize', checkScreenSize); // Clean up event listener
  }, []);



  const handleTurnPage = (page: string, index: number) => {

    const pageId = document.getElementById(page);

    if (pageId?.classList.contains(styles.turn)) {
      pageId?.classList.remove(styles.turn);
      setTimeout(() => {
        if (pageId) {
          pageId.style.zIndex = (20 - index).toString();
        }
      }, 500);
    } else {
      pageId?.classList.add(styles.turn);
      setTimeout(() => {
        if (pageId) {
          pageId.style.zIndex = (20 + index).toString();
        }
      }, 500);
    }
  }

  const pageSection = [
    { frontPage: <h1>Page1</h1>, backPage: <h1>Page2</h1> },
    { frontPage: <h1>Page4</h1>, backPage: <h1>Page5</h1> },
    { frontPage: <h1>Page6</h1>, backPage: <h1>Page7</h1> },
  ]


  useEffect(() => {
    const pages = document.querySelectorAll(`.${styles["book-page"]}.${styles["page-right"]}`);
    const totalPage = pages.length;
    let currentPage = 0;

    const reversePage = () => {
      currentPage--;
      if (currentPage < 0) {
        currentPage = totalPage - 1;
      }
    };


    const coverRight = document.querySelector<HTMLElement>(`.${styles["cover-right"]}`);

    if (coverRight) {
      setTimeout(() => {
        coverRight.classList.add(styles["turn"]);
      }, 2100);

      setTimeout(() => {
        coverRight.style.zIndex = "-1";
      }, 2800);
    }

    console.log("total page: ", totalPage);

    pages.forEach((_, index) => {
      setTimeout(() => {
        reversePage();
        (pages[currentPage] as HTMLElement).classList.remove(styles["turn"]);

        setTimeout(() => {
          reversePage();
          (pages[currentPage] as HTMLElement).style.zIndex = (10 + index).toString();
        }, 500);
      }, (index + 1) * 200 + 2100);
    });
  }, []);


  return (
    <main>
      <div className={styles.wrapper}>
        <div className={[styles.cover, styles["cover-left"]].join(" ")}></div>
        <div className={[styles.cover, styles["cover-right"]].join(" ")}></div>

        <div className={styles.book}>
          <div className={[styles["book-page"], styles["page-left"]].join(" ")}>
            <h1>Page 0</h1>
          </div>


          {pageSection.map((page, index) => {
            const pageId = `turn-${index + 1}`;
            return (
              <div
                key={index + 1}
                id={pageId}
                className={[styles["book-page"], styles["page-right"], styles["turn"]].join(" ")}>
                <div className={styles["page-front"]}>
                  {page.frontPage}
                  <FontAwesomeIcon className='next page-btn' icon={faCaretRight} onClick={() => { handleTurnPage(pageId, index) }} />
                </div>
                <div className={styles["page-back"]}>
                  {page.backPage}
                  <FontAwesomeIcon className='prev page-btn' icon={faCaretRight} onClick={() => { handleTurnPage(pageId, index + 1) }} />
                </div>
              </div>
            )
          })}

        </div>
      </div>

    </main>
  );
}
