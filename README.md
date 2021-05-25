# <img src="extension/icon.png" width="45" align="left"> Refined ZenHub

A browser extension for enhancing ZenHub. Namely, it makes it more Kanban-friendly by doing the following:

- Adjusts the issue count for each pipeline so that the number does not include linked PRs
- Displays a limit with each pipeline's issue count (this is currently hard-coded, but could be user-defined in the future)
- Hides the point estimate total on each pipeline

## Installation

Download/clone this repo, then side-load the extension into your browser.

### Firefox

- Visit about:debugging#/runtime/this-firefox
- Click `Load Temporary Add-on`
- Choose any file in the `extension` directory

### Chrome

- Visit chrome://extensions
- Click `Load unpacked` (in the top left corner)
- Choose the `extension` directory

### Brave

- Visit brave://extensions
- Toggle on `Developer mode` (in the top right corner)
- Click `Load unpacked` (in the top left corner)
- Choose the `extension` directory

## Configuration

All configuration is currently hard-coded into the extension, but you can easily change it by editing the files.

Open `extension/refined-zenhub.js` in your editor and you'll see the two primary things you might want to change at the top of the file.

### limits

This is an object where the key is the name of the pipeline and the value is the limit.

Edit the items to change the limits for the pipelines. You can change the values or add a new item for a pipeline that isn't listed (pipelines that aren't listed only show the number of issues and don't show the limit). You can make the limit a string like "Unlimited" if you'd rather that be explicit and it will say `5 / Unlimited Issues`, for example. The key needs to match the pipeline name exactly (it's case-sensitive).

### refreshInterval

This is a number in milliseconds for how often the extension should run. It's currently set to run fairly frequently, every 10 seconds, so that if you make any changes in ZenHub (add an issue, change filters, etc), it will update the issue count accordingly. If you feel that's too frequent, you can increase the interval. You can always hard refresh the page to get the latest numbers.
