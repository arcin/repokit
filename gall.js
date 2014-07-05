#!/usr/bin/env node
var https = require('https'),
    githubUser = process.env.GITHUB_USERNAME,
    githubKey = process.env.GITHUB_KEY;

var headers = {
  'User-Agent': 'RepoKit/0.0.1'
};

var options = {
  hostname: 'api.github.com',
  path: '/user/repos',
  auth: githubUser+':'+githubKey,
  method: 'GET',
  headers: headers
};

var listRepos = function(res){
  res.setEncoding('utf-8');
  var chunkyString = '';
  res.on('data', function(chunk){
    chunkyString += chunk;
  });
  res.on('end', function(){
    var repos = JSON.parse(chunkyString);
    for (var i = 0; i < repos.length; i++){
      process.stdout.write(repos[i].name + '\n');
    }
  });
  res.on('error', function(err){
    console.error(err);
  });
};

var request = https.request(options, listRepos);
request.end();