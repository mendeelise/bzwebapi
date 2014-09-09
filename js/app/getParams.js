/**
 * Created by Mende Williams
 * Date: 8/20/14
 */

var bzEnv, bzPub, bzCat;

(function(){
    var q = $.deparam.querystring();

    bzEnv = q.env != undefined ? q.env : '';
    bzPub = q.pub != undefined ? q.pub : '';
    bzCat = q.cat != undefined ? q.cat : '';

}());

