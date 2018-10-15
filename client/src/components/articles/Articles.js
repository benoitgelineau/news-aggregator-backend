/* eslint-disable no-shadow */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadNextPage } from '../../actions/articlesActions';

// import Loader from '../loader/Loader';
import Article from './Article';
import styles from '../../styles/articles/Articles.scss';

const Articles = ({ loadNextPage, ...searchArgs }) => {
  console.log('articles rendering');
  const { articles, lastQuery, totalResults, page, pageSize } = searchArgs;
  const results = articles.length;

  return (
    <div className={styles.scrollpage}>
      {
        (lastQuery !== '' && results < 1)
          ? <h3>No Results Found</h3>
          : (
            <Fragment>
              <div className={styles.container}>
                {articles.map(article => <Article key={article.id} article={{ ...article }} />)}
              </div>

              <footer className={styles.footer}>
                {totalResults > (page * pageSize)
                  && (
                    <button type="button" onClick={() => loadNextPage(searchArgs)}>
                      See more
                    </button>
                  )
                }
                {results > 0 && (
                  <p>
                    Powered by
                    {' '}
                    <a href="https://newsapi.org/">News API</a>
                  </p>
                )}
              </footer>
            </Fragment>
          )
      }
    </div>
  );
};

Articles.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
  lastQuery: PropTypes.string.isRequired,

  page: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  totalResults: PropTypes.number.isRequired,
  language: PropTypes.string.isRequired,
  options: PropTypes.instanceOf(Object).isRequired,
  loadNextPage: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  articles: state.articles.articles,
  lastQuery: state.articles.lastQuery,

  page: state.articles.page,
  pageSize: state.articles.pageSize,
  totalResults: state.articles.totalResults,
  language: state.articles.country.language.code,
  options: state.articles.options,
});

export default connect(mapStateToProps, { loadNextPage })(Articles);
