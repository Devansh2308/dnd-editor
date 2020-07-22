import { Trans } from '@lingui/macro'
import { merge } from 'lodash-es'
import React from 'react'
import { DndBlockItem } from '../../../types'
import Image from '../../components/Image'

export default {
    id: 'fullWidthImage',
    label: <Trans>Full Width Image</Trans>,
    render: (renderProps) => Image.render(renderProps, 'image-1'),
    export: (renderProps) => Image.export(renderProps, 'image-1'),
    image:
        'data:image/png;base64,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ltf3qU996v+ct+v49Kc/vVx/1/atb31r98ADD+x+9rOfLRFp3znp8UWnX/3qV8tr6LV03F7bOm4f+chHdn3058aiv+9ae82Nec//4Q9/uPvCF77wyHw0N1/72teWsT3tmnp+Y/df//Vfy3F7Xsf65Cc/ufvYxz62nLu56/ddQ3P65S9/eXfvvffuvv/97y+vvecXt047l7/3dYsBBhhggIGrw4CQJWT5xpABBhhggIFzGzhUyPriF7+4++d//ufd8573vEc+7rrrrl2Bq3P8x3/8x64I9K53vWv3T//0T7t//Md/3N1www27F77whbuXvOQlu5e//OW7N77xjbueU5gpyhRCikpFlaJQkasY89a3vnX3ute9bveyl73s/xyja3jnO9+5xKZvfOMbu5/+9KePrBI6yzfJBa/iSyGqIFak6ppuvfXW5fW9+tWv3t14442766+/fveiF71oOX9/fs1rXrO7+eabl2sr8BR+Cjq//OUv956jrqGIVUS67777lljXa37DG96wjFPj9uIXv3g5f+PYWNxxxx2PvOYCVs//yle+svuXf/mXR+ajuelxhbHTxqKxLyYW5QpVPa/5eeUrX7nMV+c/OnfN6b/+67/u3vve9y7B63vf+94y9v/93/996rlOuxZ/f3X8cGOezTMDDDCwfQNClh9efGPIAAMMMMDAuQ0cKmQVO4o7j3/84x/5KLwUU4pYrdx5y1vesrvpppuWAPLsZz9794xnPGP3lKc8Zfe0pz1t98xnPnP3D//wD8vfF22KXq3MKoQVXgpDH/jAB5aYUvR6wQtesLvmmmuWYzz1qU/dPf3pT98961nPWqLNq171qt2b3/zmZbVXIaggVJg57RvkokvxpgjT6qOiTMcpUvXanv/85++uvfba5Tydbz3v3/3d3y2f75oKS8Wjd7/73csqpVahFeFaUXba+Yt2Pa7VYD2vVWB33333EtGKZZ2/c/3t3/7tcu7O32u+7rrrlsDVtfb4omKvoaBWJDw+JwW+k66l8zcGxbfGvhVWhcPbbrttOX7hqjFvvjp3c9c4NHd///d/v3vpS1+6RLW3v/3ty3wXApu/jtdx91kVd9L1+dz2f8Axx+aYAQYY2LYBIcsPLyd+E+of/rb/4Ztf88sAA4c2cClD1ite8YolPhVDbrnllmUFUbGqlUFHg9AaZoo0z33uc5f4Ujzp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K2T1hD/96U+XpLrt8+I81j8GBhhggAEGGGCAAQYYYIABBhhgYBsGak1n/W/vkNWBrczaBhT/4M0jAwwwwAADDDDAAAMMMMAAAww8lgbOuhJrDV2PKmT15O5b7GTtKN/bIz6WL9q5/aNjgAEGGGCAAQYYYIABBhhggAEGrnwDNaRaUk3pLHtirQFr/fVRh6z1AH41AkbACBgBI2AEjIARMAJGwAgYASNgBIyAETACl2MEhKzLMcrOYQSMgBEwAkbACBgBI2AEjIARMAJGwAgYASNw7hEQss49hA5gBIyAETACRsAIGAEjYASMgBEwAkbACBgBI3A5RkDIuhyj7BxGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAuceASHr3EPoAEbACBgBI2AEjIARMAJGwAgYASNgBIyAETACl2MEhKzLMcrOYQSMgBEwAkbACBgBI2AEjIARMAJGwAgYASNw7hEQss49hA5gBIyAETACRsAIGAEjYASMgBEwAkbACBgBI3A5RkDIuhyj7BxGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAuceASHr3EPoAEbACBgBI2AEjIARMAJGwAgYASNgBIyAETACl2MEhKzLMcrOYQSMgBEwAkbACBgBI2AEjIARMAJGwAgYASNw7hEQss49hA5gBIyAETACRsAIGAEjYASMgBEwAkbACBgBI3A5RkDIuhyj7BxGwAgYASNgBIyAETACRsAIGAEjYASMgBEwAucegf8Hbq6788y1zz0AAAAASUVORK5CYII=',
    initialValues: {
        'image-1': merge({}, Image.initialValues, {
            label: 'Full Width Image'
        })
    },
    parent: 'image',
    settings: [
        {
            id: 'image-1',
            label: <Trans>Full Width Image - 1</Trans>,
            type: 'image',
            settings: Image.settings
        }
    ],
    type: 'block'
} as DndBlockItem
