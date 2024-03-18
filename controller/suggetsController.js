const tree = require('decision-tree');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const trainingData = [
  { sport: 1, family: 1, travel: 0, animal: 0, category: 'sports' },
  { sport: 0, family: 1, travel: 1, animal: 0, category: 'travel' },
  { sport: 1, family: 0, travel: 0, animal: 1, category: 'animals' },
  { sport: 0, family: 1, travel: 1, animal: 0, category: 'travel' },
  // Thêm dữ liệu huấn luyện khác tương tự
];
const target = 'category';
const features = ['sport', 'family', 'travel', 'animal'];
exports.ChudeGoiY = catchAsync(async (req, res, next) => {
  const dt = new tree(trainingData, target, features);
  const pre = dt.predict(req.body);
  res.status(200).json({
    status: 'success',
    data: pre,
  });
});
