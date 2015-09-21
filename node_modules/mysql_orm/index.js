var db=require("./lib/mysql");
exports.mysql=function(settings)
{
	return new db(settings);
}