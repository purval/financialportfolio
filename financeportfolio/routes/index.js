
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('ind');
};

exports.home = function(req, res){
  res.render('ind');
};

exports.stats = function(req, res){
  res.render('stats');
};

exports.leaders = function(req, res){
  res.render('leader');
};

exports.indexold = function(req, res){
  res.render('indexold');
};