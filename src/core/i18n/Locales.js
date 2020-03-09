import Link from 'next/link'
import styled from 'styled-components'
import mq from 'core/theme/mq'
import { locales, useLang } from '../../lib/locale'

const Container = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: ${props => props.theme.spacing}px;
    grid-row-gap: ${props => props.theme.spacing}px;
`

const Item = styled.a`
    text-align: center;
    font-size: ${props => props.theme.typography.sizes.medium};

    @media ${mq.smallMedium} {
        font-size: ${props => props.theme.typography.sizes.small};
    }
    @media ${mq.large} {
        font-size: ${props => props.theme.typography.sizes.medium};
    }

    &._is-current {
        font-weight: ${props => props.theme.typography.weights.bold};
    }
}
`

const Locales = () => {
    const lang = useLang()

    return (
        <Container className="Locales">
            {locales.map(({ path, label }) => {
                const href = `/[lang]${path === 'default' ? '?lang=en' : ''}`
                const asPath = path === 'default' ? '/' : `/${path}`
                const isCurrent = path === lang

                return (
                    <Link key={path} href={href} as={asPath} passHref>
                        <Item className={`Locales__Item${isCurrent ? ' _is-current' : ''}`}>
                            {label}
                        </Item>
                    </Link>
                )
            })}
        </Container>
    )
}

export default Locales
