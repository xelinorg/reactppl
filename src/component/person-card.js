import React from 'react';

import StatusContext from './context/status.js'

const personalizeCard = 'personalize-card'
const noResult ='no-result'
const seeMore = 'See more...'
const openTarget = '_blank'

class PersonCard extends React.Component {
  constructor(props) {
    super(props);
  }

  fixSeeMore (ctx) {
    return ctx.person.detail && ctx.person.detail.FirstURL ? ctx.person.detail.FirstURL : ''
  }

  fixImage (ctx) {
    return ctx.person.detail && ctx.person.detail.Icon && ctx.person.detail.Icon.URL ? ctx.person.detail.Icon.URL : ''
  }

  fixText(ctx) {
    return ctx.person.detail && ctx.person.detail.Text ? ctx.person.detail.Text : ''
  }

  render() {
    return (
      <StatusContext.Consumer>
      {(ctx)=>(
        ctx.person.detail ?
        <article className={personalizeCard}>
          <h1>{ctx.person.master.surname} {ctx.person.master.name}</h1>
          <img src={this.fixImage(ctx)} alt={ctx.person.master.name}/>
          <p>{this.fixText(ctx)}</p>
          {this.fixSeeMore(ctx) && <a href={this.fixSeeMore(ctx)} target={openTarget}>{seeMore}</a>}
        </article>
        : <p className={noResult}>No result</p>
      )}
      </StatusContext.Consumer>
    )
  }
}

export default PersonCard
