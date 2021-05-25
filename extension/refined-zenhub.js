(function () {
  const limits = {
    'Backlog': 15,
    'To Do': 8,
    'Work In Progress': 6,
    'Needs Review': 8,
  }
  const refreshInterval = 1000 * 10 // 10 seconds

  const pageRegex = /workspaces\/test-runner.*\/board/
  const urlPart = location.host === 'github.com' ? location.hash : location.pathname

  // Not on the test-runner board, so bail
  if (!pageRegex.test(urlPart)) return

  const allPipelinesLoaded = () => {
    const pipelines = document.querySelectorAll('.zhc-pipeline')
    const pipelinesIndex = Array.from(pipelines).reduce((memo, pipeline) => {
      const titleNode = pipeline.querySelector('.zhc-pipeline-header__pipeline-name')
      const title = titleNode && titleNode.textContent

      if (title) {
        memo[title] = true
      }

      return memo
    }, {})

    return Object.keys(limits).reduce((allFound, pipelineTitle) => {
      // already found one missing, shortcut by returning false
      if (!allFound) return false

      return !!pipelinesIndex[pipelineTitle]
    }, true)
  }

  const run = () => {
    const pipelines = document.querySelectorAll('.zhc-pipeline')

    pipelines.forEach((pipeline) => {
      const titleNode = pipeline.querySelector('.zhc-pipeline-header__pipeline-name')

      if (!titleNode) return

      const title = titleNode.textContent
      const limit = limits[title]
      const issues = pipeline.querySelectorAll('.zhc-issue-cards__cell')
      const numIssues = issues ? issues.length : 0
      const issueCount = pipeline.querySelector('.zhc-pipeline-header__issue-count')

      if (!limit) {
        // No limit for this pipeline, but still fix the count
        issueCount.textContent = `${numIssues} Issues`

        return
      }

      issueCount.textContent = `${numIssues} / ${limit} Issues`

      if (typeof limit === 'number') {
        if (numIssues === limit) {
          issueCount.style.color = '#c98b16' // orange if at limit
        } else if (numIssues > limit) {
          issueCount.style.color = '#a83232' // red if over limit
        } else {
          issueCount.style.color = ''
        }
      }
    })

    // Hide the '0 points' part we don't use
    const points = document.querySelectorAll('.zhc-pipeline-header__story-points')

    Array.from(points).forEach((point) => {
      point.style.display = 'none'
    })
  }

  setInterval(run, refreshInterval)

  // It can take time for ZenHub to load, so retry until it's fully loaded
  const initialRun = (times = 0) => {
    // Wait for all pipelines to load
    if (times === 0 && !allPipelinesLoaded()) {
      setTimeout(initialRun, 500)

      return
    }

    run()

    // We don't know how many issue there are, so run 10 times to give
    // them all time to load
    if (times > 10) return

    setTimeout(() => {
      initialRun(times + 1)
    }, 500)
  }

  initialRun()
}())
