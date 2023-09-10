import React from 'react'
import '../App.css'
import switchLeft from '../../assets/icons/switch-left.svg'
import scrollDown from '../../assets/icons/scroll-down.svg'
import rockPaperStrategy from '../../assets/images/rockpaperstrategy.jpg'
import switchRight from '../../assets/icons/switch-right.svg'
import evanLathi from '../../assets/images/evan-lahti.jpg'
import twitter from '../../assets/icons/twitter.svg'
import jadaGriffin from '../../assets/images/jada-griffin.jpg'
import aaronWilliams from '../../assets/images/aaron-williams.jpg'
import skull from '../../assets/images/skull.png'

// import { a } from "react-router-dom";

function HomePage () {
  return (
    <div>
      <section className="main-page" id="main">
        <main className="content-main">
          <h1 className="title-main">PLAY TRADITIONAL GAME</h1>
          <h3 className="explain-main">Experience new traditional game play</h3>
          <button type="button" className="btn btn-warning" id="btn-main">
            PLAY NOW
          </button>
        </main>
        <div className="sc-button">
          <div className="story-btn">
            <a className="story-txt">THE STORY</a>
            <div className="scDown-SVG-Container">
              <img
                src={scrollDown}
                alt="Scroll Down"
                className="svgScDown"
              ></img>
            </div>
          </div>
        </div>
      </section>

      <section className="second-page" id="second">
        <div className="scnd-text">
          <h3 className="whatSpecial">Whats so special?</h3>
          <h1 className="theGames">THE GAMES</h1>
        </div>
        <div className="scnd-img">
          <div className="swLeft-container">
            <img src={switchLeft} alt="Left Switch" className="swLeft-svg" />
          </div>
          <div className="img-container">
            <img
              src={rockPaperStrategy}
              alt="Rock Paper"
              className="rockpaper-img"
            />
          </div>
          <div className="swRight-container">
            <img src={switchRight} alt="Right Switch" className="swRigth-svg" />
          </div>
        </div>
      </section>

      <section className="third-page" id="third">
        <div className="thirdContainer">
          <div className="containerHeader">
            <h3 className="line1-header">Whats so special?</h3>
            <h1 className="line2-header">FEATURES</h1>
          </div>
          <div className="containerFooter">
            <div className="svgCircle">
              <svg height="500" width="100">
                <circle
                  cx="22.5"
                  cy="12"
                  r="7"
                  stroke="white"
                  strokeWidth="1"
                  fill="white"
                />
                <line
                  x1="22.5"
                  y1="20"
                  x2="22.5"
                  y2="105"
                  style={{ stroke: 'rgb(255, 255, 255)', strokeWidth: '2' }}
                />
                <circle
                  cx="22.5"
                  cy="112"
                  r="7"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                />
                <circle
                  cx="22.5"
                  cy="160"
                  r="7"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                />
              </svg>
            </div>
            <div>
              <div>
                <div className="subContentGames">
                  {' '}
                  <a className="subContent">TRADITIONAL GAMES</a>
                </div>
                <div className="explainSubContent">
                  If you miss your childhood, we provide many traditional games
                  here
                </div>
              </div>
              <div className="subContenSuit">
                {' '}
                <a className="subContent">GAME SUIT</a>
              </div>
              <div className="subContentTBD">
                {' '}
                <a className="subContent">TBD</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fourth-page" id="fourth">
        <div className="canMyComp">
          <a className="canMyComp-txt">Can My Computer Run This Game?</a>
        </div>
        <div className="specContainer">
          <div className="sysReq-txt">
            <h1 className="sysRequirement">SYSTEM REQUIREMENT</h1>
          </div>
          <div className="containerTable ms-lg-4 mt-lg-1 ms-sm-1 pt-lg-2 pt-sm-5 ps-md-0 ps-sm-5 mt-sm-0">
            <div className="row d-flex">
              <div
                className="col-md-6 col-sm-5 pt-md-1 ps-md-1 p-sm-0"
                style={{
                  fontFamily: 'Arial',
                  fontWeight: '400',
                  border: '1px solid #979797'
                }}
              >
                <p>
                  <span
                    className="text-uppercase"
                    style={{
                      color: '#FFB548',
                      fontSize: '1.5rem',
                      lineHeight: '1.6rem',
                      letterSpacing: '0.1rem'
                    }}
                  >
                    OS:
                  </span>
                </p>
                <p
                  className="text-white"
                  style={{ fontSize: '1.1rem', lineHeight: '1.3rem' }}
                >
                  Windows 7 64-bit only (No OSX support at this time)
                </p>
              </div>
              <div
                className="col-md-6 col-sm-6 pt-md-1 ps-md-1 p-sm-0"
                style={{
                  fontFamily: 'Arial',
                  fontWeight: '400',
                  border: '1px solid #979797'
                }}
              >
                <p>
                  <span
                    className="text-uppercase"
                    style={{
                      color: '#FFB548',
                      fontSize: '1.5rem',
                      lineHeight: '1.6rem',
                      letterSpacing: '0.1rem'
                    }}
                  >
                    PROCESSOR:
                  </span>
                </p>
                <p
                  className="text-white"
                  style={{ fontSize: '1.1rem', lineHeight: '1.3rem' }}
                >
                  Intel Core 2 Duo @ 2.4 GHZ or AMD Athlon X2 @ 2.8 GHZ
                </p>
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-6 col-sm-5 pt-md-1 ps-md-1 p-sm-0"
                style={{
                  fontFamily: 'Arial',
                  fontWeight: '400',
                  border: '1px solid #979797'
                }}
              >
                <p>
                  <span
                    className="text-uppercase"
                    style={{
                      color: '#FFB548',
                      fontSize: '1.5rem',
                      lineHeight: '1.6rem',
                      letterSpacing: '0.1rem'
                    }}
                  >
                    mEMORY:
                  </span>
                </p>
                <p
                  className="text-white"
                  style={{ fontSize: '1.1rem', lineHeight: '1.3rem' }}
                >
                  4 GB RAM
                </p>
              </div>
              <div
                className="col-md-6 col-sm-6 pt-md-1 ps-md-1 p-sm-0"
                style={{
                  fontFamily: 'Arial',
                  fontWeight: '400',
                  border: '1px solid #979797'
                }}
              >
                <p>
                  <span
                    className="text-uppercase"
                    style={{
                      color: '#FFB548',
                      fontSize: '1.5rem',
                      lineHeight: '1.6rem',
                      letterSpacing: '0.1rem'
                    }}
                  >
                    storage:
                  </span>
                </p>
                <p
                  className="text-white"
                  style={{ fontSize: '1.1rem', lineHeight: '1.3rem' }}
                >
                  8 GB available space
                </p>
              </div>
            </div>
            <div className="row">
              <div
                className="col-md-12 col-sm-11 pt-md-1 ps-md-1 p-sm-0"
                style={{
                  fontFamily: 'Arial',
                  fontWeight: '400',
                  border: '1px solid #979797'
                }}
              >
                <p>
                  <span
                    className="text-uppercase"
                    style={{
                      color: '#FFB548',
                      fontSize: '1.5rem',
                      lineHeight: '1.6rem',
                      letterSpacing: '0.1rem'
                    }}
                  >
                    GRAPHICS:
                  </span>
                </p>
                <p
                  className="text-white"
                  style={{ fontSize: '1.1rem', lineHeight: '1.3rem' }}
                >
                  NVIDIA GeForce GTX 660 2GB or AMD Radeon HD 7850 2GB DirectX11
                  (Shader Model 5)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="fifth-page" id="fifth">
        <div className="topScoreContainer">
          <div className="textTopScoreContainer">
            <h1 className="topScore-txt">TOP SCORES</h1>
            <p className="explainTopScore">
              This top score from various games provided on this platform
            </p>
          </div>
          <div className="seeMoreBtn">
            <button type="button" className="btn btn-warning" id="btnSeeMore">
              SEE MORE
            </button>
          </div>
        </div>
        <div className="twitContainer">
          <div className="evanLahti">
            <div className="evanLine">
              <div className="evanProfilPicture">
                <img src={evanLathi} alt="Evan Photo" className="evanPhoto" />
              </div>
              <div className="evanNameJob">
                <p className="names">Evan Lahti</p>
                <p className="jobs">PC Gamer</p>
              </div>
              <div className="twitterEvan">
                <img src={twitter} alt="Twitter Logo" className="twitterLogo" />
              </div>
            </div>
            <div className="evanCommentLine">
              <p className="comments">
                “One of my gaming highlights of the year.”
              </p>
              <p className="dates">June 18, 2021</p>
            </div>
          </div>
          <div className="jadaGriffin">
            <div className="jadaLine">
              <div className="jadaProfilPicture">
                <img src={jadaGriffin} alt="Jada Photo" className="jadaPhoto" />
              </div>
              <div className="jadaNameJob">
                <p className="names">Jada Griffin</p>
                <p className="jobs">Nerdreactor</p>
              </div>
              <div className="twitterJada">
                <img src={twitter} alt="Twitter Logo" className="twitterLogo" />
              </div>
            </div>
            <div className="jadaCommentLine">
              <p className="comments">
                “The next big thing in the world of streaming and survival
                games.”
              </p>
              <p className="dates">July 10, 2021</p>
            </div>
          </div>
          <div className="aaronWilliams">
            <div className="aaronLine">
              <div className="aaronProfilPicture">
                <img
                  src={aaronWilliams}
                  alt="Aaron Photo"
                  className="aaronPhoto"
                />
              </div>
              <div className="aaronNameJob">
                <p className="names">Aaron Williams</p>
                <p className="jobs">Uproxx</p>
              </div>
              <div className="twitterAaron">
                <img src={twitter} alt="Twitter Logo" className="twitterLogo" />
              </div>
            </div>
            <div className="aaronCommentLine">
              <p className="comments">
                “Snoop Dogg Playing The Wildly Entertaining SOS Is
                Ridiculous.”
              </p>
              <p className="dates">December 24, 2018</p>
            </div>
          </div>
        </div>
      </section>

      <section className="sixth-page" id="sixth">
        <div className="containerSixth">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-md-3 col-sm-4 mt-md-4 mt-sm-0 align-self-center">
              <img
                src={skull}
                className="img-fluid imgRadial"
                style={{ width: '90%' }}
              />
            </div>
            <div
              className="col-md-5 col-sm-5 mt-md-4 mt-sm-0 align-self-start"
              style={{ fontFamily: 'Arial', color: '#FFFFFF' }}
            >
              <h3
                className="display-6 mb-2"
                style={{ lineHeight: '1.9rem', letterSpacing: '0.2rem' }}
              >
                Want to stay in
              </h3>
              <h3
                className="display-6 mb-3"
                style={{ lineHeight: '1.9rem', letterSpacing: '0.2rem' }}
              >
                touch?
              </h3>
              <h1
                className="display-5 text-uppercase mb-4"
                style={{ letterSpacing: '0.23rem' }}
              >
                newsletter SUBSCRIBE
              </h1>
              <p
                className="mb-5"
                style={{ fontSize: '1.1rem', lineHeight: '1.6rem' }}
              >
                In order to start receiving our news, all you have to do is
                enter your email address. Everything else will be taken care of
                by us. We will send you emails containing information about
                game. We dont spam.
              </p>
              <div className="d-flex">
                <div
                  className="col-md-6 col-md-6 d-flex flex-column"
                  style={{
                    backgroundColor: '#FFFFFF14',
                    borderRadius: '0.3rem'
                  }}
                >
                  <label
                    htmlFor="emailInput"
                    className="emailLabel text-white-50 ms-2 my-2"
                    style={{
                      fontFamily: 'Open Sans',
                      fontSize: '1.1rem',
                      fontWeight: '400',
                      lineHeight: '1.1rem'
                    }}
                  >
                    Your email address
                  </label>
                  <input
                    type="text"
                    id="emailInput"
                    className="form-control"
                    placeholder="youremail@binar.co,id"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-md-6 btn-md2 btn-warning ms-3"
                  id="btnSubscribe"
                >
                  Subscribe now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer
        className="w-100 text-center text-lg-start text-sm-start text-white"
        style={{ backgroundColor: '#080A0B' }}
      >
        <div className="container1 full-height p-lg-4 pb-lg-0 p-sm-1">
          <section className="p-lg-3 p-sm-0 pb-lg-0 pb-sm-0">
            <div className="row d-flex justify-content-end align-items-center">
              <div className="col-lg-1 col-sm-auto">
                <a className="text-decoration-none text-uppercase text-white">
                  main
                </a>
              </div>
              <div className="col-lg-1 col-sm-auto">
                <a className="text-decoration-none text-uppercase text-white">
                  about
                </a>
              </div>
              <div className="col-lg-2 col-sm-auto">
                <a className="text-decoration-none text-uppercase text-white">
                  game features
                </a>
              </div>
              <div className="col-lg-3 col-sm-auto">
                <a className="text-decoration-none text-uppercase text-white">
                  system requirements
                </a>
              </div>
              <div className="col-lg-1 col-sm-auto">
                <a className="text-decoration-none text-uppercase text-white">
                  quotes
                </a>
              </div>
              <div className="col-md-auto col-sm-auto">
                <a
                  className="btn btn-sm btn-primary btn-floating m-1"
                  style={{ backgroundColor: '#3b5998' }}
                  role="button"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
              <div className="col-md-auto col-sm-auto">
                <a
                  className="btn btn-sm btn-primary btn-floating m-1"
                  style={{ backgroundColor: '#55acee' }}
                  role="button"
                >
                  <i className="fab fa-twitter"></i>
                </a>
              </div>
              <div className="col-md-auto col-sm-auto">
                <a
                  className="btn btn-sm btn-primary btn-floating m-1"
                  style={{ backgroundColor: '#FF0000' }}
                  role="button"
                >
                  <i className="fab fa-youtube"></i>
                </a>
              </div>
              <div className="col-sm-auto col-sm-auto">
                <a
                  className="btn btn-sm btn-primary btn-floating m-1"
                  style={{ backgroundColor: '#6441a5' }}
                  role="button"
                >
                  <i className="fab fa-twitch"></i>
                </a>
              </div>
            </div>
          </section>

          <hr className="my-2" />

          <section className="p-lg-3 p-sm-1 pt-lg-0 pt-sm-0 pb-sm-3">
            <div className="row d-flex align-items-center">
              <div className="col-lg-6 col-sm-5 mt-lg-2 m-sm-0 text-center text-md-start text-sm-start">
              </div>
            </div>
          </section>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
