const getDate = (date) => {
  const d = new Date(Date.parse(date));

  const months = {
      0: 'января',
      1: 'февраля',
      2: 'марта',
      3: 'апреля',
      4: 'мая',
      5: 'июня',
      6: 'июля',
      7: 'августа',
      8: 'сентября',
      9: 'октября',
      10: 'ноября',
      11: 'декабря'
  };

  return(`${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} в ${d.getHours() < 10 ? `0${d.getHours()}`: d.getHours()}:${d.getMinutes() < 10 ? `0${d.getMinutes()}`: d.getMinutes()}`);
};

export default getDate;
