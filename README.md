#PlumTube

Use the combined power of jQuery and YouTube API v2.0 video feeds to generate an list of links to videos on a particular YouTube channel or playlist. The output is a clean unordered list element that can be styled as desired, and can also support the addition of modal popup player functionality from plugins such as [fancybox](http://fancyapps.com/fancybox/).

To see PlumTube in action, check out the [demo page](http://stephanieplumeri.net/plumlabs/plumtube/).

##Installation

Load your jQuery library of choice (as long as your choice is jQuery 1.6.0 or higher), followed by the PlumTube script. For older jQuery libraries, use PlumTube v1.0.

    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <script src="js/plumtube.min.js"></script>
  
Create the container element where you want the YouTube feed to generate, and assign it a unique id attribute for PlumTube to target. Insert a fallback link to the content you are pulling into the YouTube feed. This link will only display if Javascript is not enabled on the user's browser.

    <div id="yt-feed"><a href="http://www.youtube.com/koryphaios">Watch my videos on YouTube.</a></div>

Add the appropriate data attributes to your container element. At minimum, you must include both the data-plumtube attribute and either the data-plum-user (for videos from a particular channel) or data-plum-playlist (for videos from a specific playlist) attribute.

    <div id="yt-feed" data-plumtube data-plum-user="koryphaios"><a href="http://www.youtube.com/koryphaios">Watch my videos on YouTube.</a></div>

Need help selecting the right attributes? Check out the [PlumTube Code Generator](http://stephanieplumeri.net/plumlabs/plumtube/generator.html).

##Attributes
<dl>
<dt>data-plum-large-thumb</dt>
<dd>boolean: Inserts the larger version of the thumbnail image (480px by 360px) into the link list. Default is <code>false</code> (inserts 120px by 90px thumbnail image).</dd>

<dt>data-plum-max-results</dt>
<dd>integer: Defines the maximum number of videos to be pulled into the feed. Default is <code>10</code>.</dd>

<dt>data-plum-modal</dt>
<dd>boolean: If true, feed list links will direct to video embed URL instead of YouTube page URL for that video. This link format works with modal popup or other custom embed scripts, such as fancybox. Default is <code>false</code>.</dd>

<dt>data-plum-modal-options</dt>
<dd>object: Defines additional URL parameters to be added to video embed URL. <code>data-plum-modal</code> must be <code>true</code> in order for parameters to be appended to URL. Each parameter you wish to append to the URL should be added as another parameter to the data-plum-modal-options object. Note that the attribute itself should be wrapped in single quotes, and each parameter within the attribute object should be wrapped in double quotes.<br/>For example, <code>data-plum-modal-options="{"controls":0, "autoplay":1}"</code> returns <code>"http://www.youtube.com/embed/VIDEO_ID?controls=0&autoplay=1"</code> for each video.</dd>

<dt>data-plum-new-window</dt>
<dd>boolean: Sets <code>"target='_blank'"</code> on feed links. Default is <code>false</code>.</dd>

<dt>data-plum-show-thumb</dt>
<dd>boolean: Show image thumbnail link. If <code>false</code>, feed will load plain text link to each video (with the video name as the link text). Default is <code>true</code>.</dd>

<dt>data-plum-show-title</dt>
<dd>string (<code>'link'</code> || <code>'text'</code>): Adds the title of each video to its respective list item. <code>'text'</code> inserts the title as plain text. <code>'link'</code> inserts the title as a link with the same href as the video thumbnail link. Default is <code>undefined</code> (no title will show with thumbnail).</dd>
</dl>
