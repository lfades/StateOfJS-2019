import React from 'react'
import Block from 'core/components/Block'
import ToolsCirclePackingChart from '../charts/ToolsCirclePackingChart'
import compact from 'lodash/compact'
import { colors } from '../../../constants'
import round from 'lodash/round'
import ToolOpinionsLegend from '../charts/ToolOpinionsLegend'
import ToolsScatterplotChart from '../charts/ToolsScatterplotChart'

const sectionColors = {
  'css-frameworks': colors.purple,
  'methodologies': colors.yellow,
  'css-in-js': colors.greenDark,
  'pre-post-processors': colors.red,
}
/*

Parse data and convert it into a format compatible with the Circle Packing chart

*/
const getChartData = data => {

    const sections = data.tools.nodes.map(section => {
        const { section_id, aggregations } = section
        const sectionData = aggregations.map(tool => {

            const { id, opinion } = tool

            // if tool doesn't have opinions data, abort
            if (!opinion) {
                return null
            }

            // get count for a given bucket
            const getCount = id => tool.opinion.buckets.find(b => b.id === id).count

            const usersCount = getCount('would_use') + getCount('would_not_use')
            const satisfactionPercentage = round((getCount('would_use') / usersCount) * 100, 2)

            const node = {
                id,
                x: usersCount,
                y: satisfactionPercentage
            }

            return node
        })
        return {
          color: sectionColors[section_id],
            id: section_id,
            data: compact(sectionData)
        }
    })
    return sections
}

const ToolsOverviewBlock = ({ data }) => {
    const chartData = getChartData(data)
    return (
        <Block id="tools-scatterplot" showDescription={true} className="ToolsScatterplotBlock">
            <ToolsScatterplotChart data={chartData} />
        </Block>
    )
}

export default ToolsOverviewBlock