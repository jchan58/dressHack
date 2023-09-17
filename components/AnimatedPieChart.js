import React from 'react';
import { PieChart } from 'react-native-svg-charts';
import { Text } from 'react-native-svg';

function AnimatedPieChart({ prediction, labels }) {
    if (!prediction || !Array.isArray(prediction[0])) return null;

    function someColorFunction(index) {
        const colors = ['#F44336', '#E91E63', '#9C27B0', '#673AB7', '#3F51B5'];
        return colors[index % colors.length];
    }

    const pieData = prediction[0].map((prob, index) => ({
        value: prob,
        svg: {
            fill: someColorFunction(index),
        },
        key: `pie-${index}`,
        onPress: () => console.log('press on', index)
    }));

    const Labels = ({ slices, height, width }) => {
        return slices.map((slice, index) => {
            const { labelCentroid, pieCentroid, data } = slice;
            return (
                <Text
                    key={index}
                    x={pieCentroid[0]}
                    y={pieCentroid[1]}
                    fill="white"
                    textAnchor={'middle'}
                    alignmentBaseline={'middle'}
                    fontSize={10}
                    stroke={'black'}
                    strokeWidth={0.2}
                >
                    {labels[index]}
                </Text>
            );
        });
    };

    return (
        <PieChart
            style={{ height: 200 }}
            outerRadius={'70%'}
            innerRadius={10}
            data={pieData}
        >
            <Labels />
        </PieChart>
    );
}

export default AnimatedPieChart
