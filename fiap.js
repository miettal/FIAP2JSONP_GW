/*$
 * FIAP2JSONP_GW$
 * https://github.com/miettal/FIAP2JSONP_GW$
 *$
 * Copyright 2012, "miettal" Hiromasa Ihara$
 * Licensed under the MIT license.$
 */
var FiapClient = function(fiap2jsonp_url, fiap_url){
  return {
    fiap2jsonp_url : fiap2jsonp_url,
    fiap_url : fiap_url,

    fetch_latest : function(point_id, callback){
      if(point_id instanceof Array){
        point_ids = point_id;
      }else{
        point_ids = [point_id];
      }
      return this.fetch(
        $.map(point_ids, function(point_id_){
          return {
            'id' : point_id_,
            'attrName' : 'time',
            'select' : 'maximum'
          };
        }),
        callback
      );
    },
    fetch_latest_1hour : function(point_id, callback){
      gteq = moment().subtract('hours', 1).format();
      lteq = moment().format();
      if(point_id instanceof Array){
        point_ids = point_id;
      }else{
        point_ids = [point_id];
      }
      return this.fetch(
        $.map(point_ids, function(point_id_){
          return {
            'id' : point_id_,
            'attrName' : 'time',
            'gteq' : gteq,
            'lteq' : lteq,
          };
        }),
        callback
      );
    },
    fetch_latest_1day : function(point_id, callback){
      gteq = moment().subtract('days', 1).format();
      lteq = moment().format();
      if(point_id instanceof Array){
        point_ids = point_id;
      }else{
        point_ids = [point_id];
      }
      return this.fetch(
        $.map(point_ids, function(point_id_){
          return {
            'id' : point_id_,
            'attrName' : 'time',
            'gteq' : gteq,
            'lteq' : lteq,
          };
        }),
        callback
      );
    },
    fetch_by_time : function(point_id, from, to, callback){
      gteq = from.format();
      lteq = to.format();
      if(point_id instanceof Array){
        point_ids = point_id;
      }else{
        point_ids = [point_id];
      }
      return this.fetch(
        $.map(point_ids, function(point_id_){
          return {
            'id' : point_id_,
            'attrName' : 'time',
            'gteq' : gteq,
            'lteq' : lteq,
          };
        }),
        callback
      );
    },
    fetch_by_just_time : function(point_id, eq, callback){
      var eqs;
      if(eq instanceof Array){
        eqs = _.map(eq, function(t){ return t.format()});
      }else{
        eqs = [eq.format()];
      }
      var point_ids;
      if(point_id instanceof Array){
        point_ids = point_id;
      }else{
        point_ids = [point_id];
      }
      var keys = [];
      _.each(eqs, function(eq){
        _.each(point_ids, function(point_id_){
          keys.push({
            'id' : point_id_,
            'attrName' : 'time',
            'eq' : eq,
          });
        });
      });
      return this.fetch(
        keys,
        callback
      );
    },
    fetch : function(key, callback){
      return $.getJSON(
        this.fiap2jsonp_url+'?callback=?',
        {
          fiap_url: this.fiap_url,
          key: key,
        },
        callback
      );
    },
  };
};
