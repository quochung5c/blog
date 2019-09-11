const rank = [
  "Sắt",
  "Đồng",
  "Bạc",
  "Vàng",
  "Bạch kim",
  "Kim cương",
  "Cao thủ",
  "Thách đấu"
];
function fetchData(database, [...rankInput], roleInput) {
  return database.filter(item => {
    return (
      item.role !== roleInput &&
      (item.rank === rankInput[0] ||
        item.rank === rankInput[1] ||
        item.rank === rankInput[2]) &&
      item.status === "false"
    );
  });
}
module.exports.showSuggestions = (database, rankInput, roleInput) => {
  for (var i = 0; i < rank.length; i++) {
    if (rank[i] === rankInput) {
      let result = [rank[i + 1], rank[i], rank[i - 1]];
      return fetchData(database, result, roleInput);
    }
  }
};
