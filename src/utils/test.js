const cheerio = require('cheerio');

function extractHierarchicalText3(html){
  const $ = cheerio.load(html);
  return $('body').text().trim();
}

// Exemplo de uso com o mesmo HTML:
const html = `
<html lang="en" op="news"><head><meta name="referrer" content="origin"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="stylesheet" type="text/css" href="news.css?mA0rO7wx5TlQORviHIeG">
        <link rel="icon" href="y18.svg">
                    <link rel="alternate" type="application/rss+xml" title="RSS" href="rss">
        <title>Hacker News</title></head><body><center><table id="hnmain" border="0" cellpadding="0" cellspacing="0" width="85%" bgcolor="#f6f6ef">
        <tr><td bgcolor="#ff6600"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding:2px"><tr><td style="width:18px;padding-right:4px"><a href="https://news.ycombinator.com"><img src="y18.svg" width="18" height="18" style="border:1px white solid; display:block"></a></td>
                        <td style="line-height:12pt; height:10px;"><span class="pagetop"><b class="hnname"><a href="news">Hacker News</a></b>
                                                <a href="newest">new</a> | <a href="front">past</a> | <a href="newcomments">comments</a> | <a href="ask">ask</a> | <a href="show">show</a> | <a href="jobs">jobs</a> | <a href="submit" rel="nofollow">submit</a>          </span></td><td style="text-align:right;padding-right:4px;"><span class="pagetop">
                                                        <a href="login?goto=news">login</a>
                                                </span></td>
                        </tr></table></td></tr>
<tr id="pagespace" title="" style="height:10px"></tr><tr><td><table border="0" cellpadding="0" cellspacing="0">
                        <tr class='athing submission' id='43464068'>
        <td align="right" valign="top" class="title"><span class="rank">1.</span></td>       <td valign="top" class="votelinks"><center><a id='up_43464068' href='vote?id=43464068&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://qwenlm.github.io/blog/qwen2.5-vl-32b/">Qwen2.5-VL-32B: Smarter and Lighter</a><span class="sitebit comhead"> (<a href="from?site=qwenlm.github.io"><span class="sitestr">qwenlm.github.io</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_43464068">114 points</span> by <a href="user?id=tosh" class="hnuser">tosh</a> <span class="age" title="2025-03-24T18:35:12 1742841312"><a href="item?id=43464068">1 hour ago</a></span> <span id="unv_43464068"></span> | <a href="hide?id=43464068&amp;goto=news">hide</a> | <a href="item?id=43464068">54&nbsp;comments</a>          </span>
                  </td></tr>
        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing submission' id='43464230'>
        <td align="right" valign="top" class="title"><span class="rank">2.</span></td>       <td valign="top" class="votelinks"><center><a id='up_43464230' href='vote?id=43464230&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.internetarchive.eu/">Internet Archive Europe – Bringing Collections to Life</a><span class="sitebit comhead"> (<a href="from?site=internetarchive.eu"><span class="sitestr">internetarchive.eu</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_43464230">34 points</span> by <a href="user?id=robin_reala" class="hnuser">robin_reala</a> <span class="age" title="2025-03-24T18:52:47 1742842367"><a href="item?id=43464230">1 hour ago</a></span> <span id="unv_43464230"></span> | <a href="hide?id=43464230&amp;goto=news">hide</a> | <a href="item?id=43464230">3&nbsp;comments</a>          </span>
                  </td></tr>
        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing submission' id='43461701'>
        <td align="right" valign="top" class="title"><span class="rank">3.</span></td>       <td valign="top" class="votelinks"><center><a id='up_43461701' href='vote?id=43461701&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://crates.io/crates/triforce-lv2">Triforce – a beamformer for Apple Silicon laptops</a><span class="sitebit comhead"> (<a href="from?site=crates.io"><span class="sitestr">crates.io</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_43461701">337 points</span> by <a href="user?id=tosh" class="hnuser">tosh</a> <span class="age" title="2025-03-24T14:45:34 1742827534"><a href="item?id=43461701">5 hours ago</a></span> <span id="unv_43461701"></span> | <a href="hide?id=43461701&amp;goto=news">hide</a> | <a href="item?id=43461701">139&nbsp;comments</a>          </span>
                  </td></tr>
        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing submission' id='43462882'>
        <td align="right" valign="top" class="title"><span class="rank">4.</span></td>       <td valign="top" class="votelinks"><center><a id='up_43462882' href='vote?id=43462882&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://scholarworks.lib.csusb.edu/cgi/viewcontent.cgi?article=1201&amp;context=history-in-the-making">Project Operation Whitecoat Military Human Experimentation on 7th Day Adventists (2010)</a><span class="sitebit comhead"> (<a href="from?site=csusb.edu"><span class="sitestr">csusb.edu</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_43462882">68 points</span> by <a href="user?id=smegger001" class="hnuser">smegger001</a> <span class="age" title="2025-03-24T16:35:07 1742834107"><a href="item?id=43462882">3 hours ago</a></span> <span id="unv_43462882"></span> | <a href="hide?id=43462882&amp;goto=news">hide</a> | <a href="item?id=43462882">29&nbsp;comments</a>          </span>
                  </td></tr>
        <tr class="spacer" style="height:5px"></tr>
                        <tr class='athing submission' id='43464541'>
        <td align="right" valign="top" class="title"><span class="rank">5.</span></td>       <td valign="top" class="votelinks"><center><a id='up_43464541' href='vote?id=43464541&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://principlesofcryptography.com/number-theory-primer-an-axiomatic-study-of-natural-numbers-peano-axioms/">The Peano Axioms: Building Blocks of Arithmetic</a><span class="sitebit comhead"> (<a href="from?site=principlesofcryptography.com"><span class="sitestr">principlesofcryptography.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_43464541">14 points</span> by <a href="user?id=ulugh" class="hnuser">ulugh</a> <span class="age" title="2025-03-24T19:26:05 1742844365"><a href="item?id=43464541">37 minutes ago</a></span> <span id="unv_43464541"></span> | <a href="hide?id=43464541&amp;goto=news">hide</a> | <a href="item?id=43464541">4&nbsp;comments</a>          </span>
                  </td></tr>

        <tr class="spacer" style="height:5px"></tr>
                <tr class="morespace" style="height:10px"></tr><tr><td colspan="2"></td>
        <td class='title'><a href='?p=2' class='morelink' rel='next'>More</a></td>       </tr>
        </table>
</td></tr>
<tr><td><img src="s.gif" height="10" width="0"><table width="100%" cellspacing="0" cellpadding="1"><tr><td bgcolor="#ff6600"></td></tr></table><br>
<center>Join us for <a href="https://events.ycombinator.com/ai-sus"><u>AI Startup School</u></a> this June 16-17 in San Francisco!</center><br>
<center><span class="yclinks"><a href="newsguidelines.html">Guidelines</a> | <a href="newsfaq.html">FAQ</a> | <a href="lists">Lists</a> | <a href="https://github.com/HackerNews/API">API</a> | <a href="security.html">Security</a> | <a href="https://www.ycombinator.com/legal/">Legal</a> | <a href="https://www.ycombinator.com/apply/">Apply to YC</a> | <a href="mailto:hn@ycombinator.com">Contact</a></span><br><br>
<form method="get" action="//hn.algolia.com/">Search: <input type="text" name="q" size="17" autocorrect="off" spellcheck="false" autocapitalize="off" autocomplete="off"></form></center></td></tr>         </table></center></body>
          <script type='text/javascript' src='hn.js?mA0rO7wx5TlQORviHIeG'></script>
  </html>
`;

const textoSimples = extractHierarchicalText3(html);
console.log(textoSimples);