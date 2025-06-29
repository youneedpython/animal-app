import logo from './logo.svg';
import React from 'react';
import './App.css';

const jsonLocalStorage = {

  setItem: (key, value) => {
    console.log('[jsonLocalStorage] setItem 실행됨');
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    console.log('[jsonLocalStorage] getItem 실행됨');
    return JSON.parse(localStorage.getItem(key));
  },
};
console.log('처음 배우는 리액트 😊');

const H1 = (props) => <h1>{props.children}</h1>;

const Form = ({ updateMainAnimal }) => {
  // console.log('Form Component 실행');

  const [value, setValue] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  const hangul = (text) => /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(text);

  function handleInputChange(data) {
    const userValue = data.target.value;
    setValue(userValue.toUpperCase());

    if (hangul(userValue)) {
      setErrorMessage('한글은 입력할 수 없습니다.');
    } else {
      setErrorMessage('');
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (value === '') {
      setErrorMessage('빈 값은 추가할 수 없습니다.');
      return;
    }

    setErrorMessage('');
    updateMainAnimal();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="귀여운 동물을 입력하세요."
        onChange={handleInputChange}
        value={value}
      />
      <button type="submit">추가</button>
      <p style={{ color: "#f00" }}>{errorMessage}</p>
    </form>
  );
}

const MainCard = ({ src, alt, handleHeartClick, choiceFavorite, heartCounter }) => {
  // console.log('MainCard Component 실행');
  const heartIcon = choiceFavorite ? '❤️' : '💙';

  return (
    <div className="main-card">
      <img src={src} alt={alt} width="400px" />
      <button onClick={handleHeartClick} >{heartIcon}{heartCounter}</button>
    </div>
  );
}

const AnimalItem = ({ src, alt }) => (
  <li>
    <img src={src} alt={alt} />
  </li>
);

const Favorites = ({ favorites }) => {
  console.log('[Favorites] favorites >> ', favorites);

  return (
    <ul className="favorites">
      {favorites.map(animal => <AnimalItem src={animal} key={animal} />)}
    </ul>
  );
}

function App() {
  console.log('** App 실행 **');

  const animal01 = 'img/bear.png';
  const animal02 = 'img/elephant.png';
  const animal03 = 'img/fox.png';
  const animal04 = 'img/rabbit.png';

  const [mainAnimal, setMainAnimal] = React.useState(animal01);
  // const [favorites, setFavorites] = React.useState(localStorage.getItem('favorites') || []);
  // const [favorites, setFavorites] = React.useState(jsonLocalStorage.getItem('favorites') || []);
  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem('favorites') || [];
  });

  // const [count, setCount] = React.useState(1);
  // const [count, setCount] = React.useState(jsonLocalStorage.getItem('count'));
  const [count, setCount] = React.useState(() => {
    console.log('count setState 메서드 실행됨');
    return jsonLocalStorage.getItem('count');
  });
  console.log('count >> ', count);

  const choiceFavorite = favorites.includes(mainAnimal);
  const [heartCounter, setHeartCounter] = React.useState(0);



  function updateMainAnimal() {
    setMainAnimal(animal02);

    // const nextCount = count + 1;
    // setCount(nextCount);
    setCount((pre) => {
      const nextCount = pre + 1;
      jsonLocalStorage.setItem('count', nextCount);
      return nextCount;
    });

    // console.log('[handleSubmit] count >> ', count); // 이전 상태값
    // console.log('[handleSubmit] nextCount >> ', nextCount); //  상태값

    // localstorage에 저장
    // localStorage.setItem('count', JSON.stringify(nextCount));
    // jsonLocalStorage.setItem('count', nextCount);
  }

  function handleHeartClick() {
    console.log('하트 버튼 클릭');
    // setFavorites([...favorites, mainAnimal]);

    // const nextFavorites = [...favorites, mainAnimal];
    // setFavorites(nextFavorites);
    // // localStorage.setItem('favorites', nextFavorites);
    // jsonLocalStorage.setItem('favorites', nextFavorites);

    setFavorites((pre) => {
      const nextFavorites = [...pre, mainAnimal];
      jsonLocalStorage.setItem('favorites', nextFavorites);
      setHeartCounter(heartCounter + 1);
      return nextFavorites;
    });

  }

  return (
    <div>
      <H1>{count} 페이지</H1>
      <Form updateMainAnimal={updateMainAnimal} />
      <MainCard
        src={mainAnimal}
        heartCounter={heartCounter}
        alt="아기 곰"
        handleHeartClick={handleHeartClick}
        choiceFavorite={choiceFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
  );
}

export default App;
